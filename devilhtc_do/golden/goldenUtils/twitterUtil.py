import tweepy
import math
'''
import sys
if sys.version_info[0]<3:
	import urlparse
else:
	import urllib.request
'''
from . import twitterAuthInfo as tai

PUBLIC_TWEET_COUNT = 200
PUBLIC_TWEET_COUNT_2 = 100

# setup tweepy api to get users and tweets
def setupAPI():
	auth = tweepy.OAuthHandler(tai.CONSUMER_KEY, tai.CONSUMER_SECRET)
	auth.set_access_token(tai.ACCESS_TOKEN, tai.ACCESS_TOKEN_SECRET)
	api = tweepy.API(auth)
	return api

# validate screen name of user
def validateUser(screen_name):
	baseUrl = 'https://twitter.com/'
	'''
	if sys.version_info[0]<3:
		try:
			res=urlparse.urlopen(baseUrl+screen_name)
		except urllib.error.HTTPError:
			err = 'invalid user screen name' + screen_name
			print(err)
			return False
	else:
		try:
			res=urllib.request.urlopen(baseUrl+screen_name)
		except urllib.error.HTTPError:
			err = 'invalid user screen name' + screen_name
			print(err)
			return False
	'''
	return True

def getClosestFriendsOfUser(user_info, maxCount = 5, version = 1):
	api = setupAPI()
	user = None
	if 'user_id' in user_info:
		user = api.get_user(user_info['user_id'])
	elif 'screen_name' in user_info:
		user = api.get_user(user_info['screen_name'])
	else:
		assert(False, 'invalid user info inputs')
	curUser = TwitterUser(user.id, api)
	if version == 1:
		closestFriends = curUser.getClosestFriends(maxCount)
	else:
		closestFriends = curUser.getClosestFriends2(maxCount)
	closestFriendsInfo = [idToUserInfo(friend_id, api) for friend_id in closestFriends]
	return closestFriendsInfo

def idToUserInfo(user_id, api):
	user = api.get_user(user_id)
	user_info = {}
	user_info['user_id'] = user_id
	user_info['screen_name'] = user.screen_name
	user_info['name'] = user.name
	return user_info

def isInReplyTo(user_id, tweet):
	return tweet.in_reply_to_user_id is not None and tweet.in_reply_to_user_id == user_id

def isMentioned(user_id, tweet):
	mentions = tweet.entities['user_mentions']
	for m in mentions:
		if m['id'] == user_id:
			return True
	return False

# get how many times the tweets are posted in reply to user_id
def getReplyCounts(user_id, tweets):
	total = 0
	for tweet in tweets:
		if isInReplyTo(user_id, tweet):
			total += 1
	return total

# get how many times user_id is mentioned in the tweets
def getMentionCounts(user_id, tweets):
	total = 0
	for tweet in tweets:
		if isMentioned(user_id, tweet):
			total += 1
	return float(total)

# compare two set of friends
# friends1 is a set
# friends2 is a list
def numCommonFriends(friends1, friends2):
	total = 0
	for f in friends2:
		if f in friends1:
			total += 1
	return total

class TwitterUser(object):
	def __init__(self, user_id, api):
		self.user_id = user_id
		self.user = api.get_user(user_id)
		self.user_name = self.user.screen_name
		self.api = api

	def __str__(self):
		return '<TwitterUser [ id = ' + str(self.user_id) + ', screen_name = ' + self.user_name + ' ]>'

	def getFriends(self):
		return self.api.friends_ids(self.user_id)

	def getMyTweets(self, count = PUBLIC_TWEET_COUNT):
		myTweets = self.api.user_timeline(self.user_id, count = count)
		return myTweets

	def getMyTweets2(self, count = PUBLIC_TWEET_COUNT_2):
		return self.getMyTweets(count = count)

	# second version of finding closest friends
	def getClosestFriends2(self, maxCount = 5):
		friendsIds = self.getFriends()
		myTweets = self.getMyTweets2()

		# reply and mention constitute of part of scores
		myReplyCounts = [
			getReplyCounts(ele, myTweets) for ele in friendsIds
		]
		myMentionCounts = [
			getMentionCounts(ele, myTweets) for ele in friendsIds
		]
		scores = [
			math.pow(float(myReplyCounts[i] + myMentionCounts[i]), 0.5) for i in range(len(friendsIds))
		]
		baseFriends = [
			(i, friendsIds[i]) for i in range(len(friendsIds)) if scores[i] > 0.0
		]
		print('base friends to look at is', baseFriends)
		baseFriendsFriends = [
			(i, self.api.friends_ids(friendId)) for i, friendId in baseFriends
		]
		myFriends = set(friendsIds)

		baseFriendsCommonFriends = [
			(i, numCommonFriends(myFriends, friendsFriends)) for i, friendsFriends in baseFriendsFriends
		]

		# sum them up and sort
		for i, additionalScore in baseFriendsCommonFriends:
			scores[i] += additionalScore
		
		zipped = [
			(-scores[i], friendsIds[i]) for i in range(len(friendsIds))
		]
		zipped = sorted(zipped)
		print('their scores are', scores)
		# find friend ids and return the ids only
		closestFriendsAndScores = zipped[:maxCount]
		closestFriends = [ele[1] for ele in closestFriendsAndScores]
		return closestFriends

	def getClosestFriends(self, maxCount = 5):
		friendsIds = self.getFriends()
		myTweets = self.getMyTweets()

		# reply and mention constitutes of scores
		myReplyCounts = [
			getReplyCounts(ele, myTweets) for ele in friendsIds
		]
		myMentionCounts = [
			getMentionCounts(ele, myTweets) for ele in friendsIds
		]

		# sum them up and sort
		totalScores = [
			myReplyCounts[i]+myMentionCounts[i] for i in range(len(friendsIds))
		]
		zipped = [
			(-totalScores[i], friendsIds[i]) for i in range(len(friendsIds))
		]
		zipped = sorted(zipped)

		# find friend ids and return the ids only
		closestFriendsAndScores = zipped[:maxCount]
		closestFriends = [ele[1] for ele in closestFriendsAndScores]
		return closestFriends


import { GoogleTagManager } from './GoogleTagManager';
import { GoogleAnalyticsSettings } from './GoogleAnalyticsSettings';
import { GoogleAnalyticsBridge } from './NativeBridges';

// Exported Google analytics native bridged method that
// accepts trackerId as first argument.
const {
  trackScreenView,
  trackEvent,
  trackScreenViewWithCustomDimensionValues,
  trackEventWithCustomDimensionValues,
  trackTiming,
  trackPurchaseEvent,
  trackMultiProductsPurchaseEvent,
  trackException,
  setUser,
  allowIDFA,
  trackSocialInteraction,
  setTrackUncaughtExceptions,
  setAppName,
  setAppVersion,
  setAnonymizeIp,
} = GoogleAnalyticsBridge;

export class GoogleAnalytics {
  // Backwards compatibility
  // GoogleTagManager was static property of GoogleAnalytics class in previous version.
  static GoogleTagManager = GoogleTagManager;

  constructor(trackerIds = []) {
    if (Array.isArray(trackerIds)) {
      this.setTrackerIds(trackerIds);
    } else if (trackerIds) {
      this.setTrackerId([trackerIds]);
    } else {
      this.setTrackerIds([]);
    }
  }

  /**
   * Backwards compatibility, old API support.
   * @param {String} trackerId
   */
  setTrackerId(trackerId) {
    this.setTrackerIds([trackerId]);
  }

  /**
   * @param {Array} trackerIds
   */
  setTrackerIds(trackerIds) {
    this.trackerIds = new Set(trackerIds);
  }

  /**
   * Push trackerId into tracker ids set.
   * @param {String} trackerId
   */
  addTrackerId(trackerId) {
    this.trackerIds.push(trackerId);
  }

  /**
   * Remove trackerId from tracker ids set.
   * @param {String} trackerId
   */
  removeTrackerId(trackerId) {
    this.trackerIds.delete(trackerId);
  }

  /**
   * Call provided method with provided arguments for every trackerId.
   * Injects trackerId as first argument.
   *
   * @param {Function} method
   * @param {Arguments} args Passed method arguments
   */
  callNativeMethod(method, args) {
    this.trackerIds.forEach(
      trackerId =>
        method.call(GoogleAnalyticsBridge, trackerId, ...args)
    );
  }

  /**
   * Track the current screen/view
   * @param  {String} screenName The name of the current screen
   */
  trackScreenView(screenName) {
    this.callNativeMethod(trackScreenView, arguments);
  }

  /**
   * Track an event that has occured
   * @param  {String} category       The event category
   * @param  {String} action         The event action
   * @param  {Object} optionalValues An object containing optional label and value
   */
  trackEvent(category, action, optionalValues = {}) {
    this.callNativeMethod(trackEvent, arguments);
  }

  /**
   * Track the current screen/view with custom dimension values
   * @param  {String} screenName The name of the current screen
   * @param  {Object} customDimensionValues An object containing custom dimension key/value pairs
   */
  trackScreenViewWithCustomDimensionValues(screenName, customDimensionValues) {
    this.callNativeMethod(trackScreenViewWithCustomDimensionValues, arguments);
  }

  /**
   * Track an event that has occured with custom dimension values
   * @param  {String} category       The event category
   * @param  {String} action         The event action
   * @param  {Object} optionalValues An object containing optional label and value
   * @param  {Object} customDimensionValues An object containing custom dimension key/value pairs
   */
  trackEventWithCustomDimensionValues(category, action, optionalValues = {}, customDimensionValues) {
    this.callNativeMethod(trackEventWithCustomDimensionValues, arguments);
  }

  /**
   * Track an event that has occured
   * @param  {String} category       The event category
   * @param  {Number} value         	The timing measurement in milliseconds
   * @param  {Object} optionalValues An object containing optional name and label
   */
  trackTiming(category, value, optionalValues = {}) {
    this.callNativeMethod(trackTiming, arguments);
  }

  /**
   * Track a purchase event. This uses the Enhanced Ecommerce GA feature.
   * @param  {Object} product       An object with product values
   * @param  {Object} transaction   An object with transaction values
   * @param  {String} eventCategory The event category, defaults to Ecommerce
   * @param  {String} eventAction   The event action, defaults to Purchase
   */
  trackPurchaseEvent(product = {}, transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
    this.callNativeMethod(trackPurchaseEvent, arguments);
  }

  /**
   * Track a purchase event. This uses the Enhanced Ecommerce GA feature.
   * @param  {Array} products       An array with products
   * @param  {Object} transaction   An object with transaction values
   * @param  {String} eventCategory The event category, defaults to Ecommerce
   * @param  {String} eventAction   The event action, defaults to Purchase
   */
  trackMultiProductsPurchaseEvent(products = [], transaction = {}, eventCategory = "Ecommerce", eventAction = "Purchase") {
    this.callNativeMethod(trackMultiProductsPurchaseEvent, arguments);
  }

  /**
   * Track an exception
   * @param  {String} error The description of the error
   * @param  {Boolean} fatal A value indiciating if the error was fatal, defaults to false
   */
  trackException(error, fatal = false) {
    this.callNativeMethod(trackException, arguments);
  }

  /**
   * Sets the current userId for tracking.
   * @param {String} userId The current userId
   */
  setUser(userId) {
    this.callNativeMethod(setUser, arguments);
  }

  /**
   * Sets if IDFA (identifier for advertisers) collection should be enabled
   * @param  {Boolean} enabled Defaults to true
   */
  allowIDFA(enabled = true) {
    this.callNativeMethod(allowIDFA, arguments);
  }

  /**
   * Track a social interaction, Facebook, Twitter, etc.
   * @param  {String} network
   * @param  {String} action
   * @param  {String} targetUrl
   */
  trackSocialInteraction(network, action, targetUrl) {
    this.callNativeMethod(trackSocialInteraction, arguments);
  }

  /**
   * Sets if uncaught exceptions should be tracked
   * @param {Boolean} enabled
   */
  setTrackUncaughtExceptions(enabled) {
    this.callNativeMethod(setTrackUncaughtExceptions, arguments);
  }

  /**
   * Sets the trackers appName
   * The Bundle name is used by default
   * @param {String} appName
   */
  setAppName(appName) {
    this.callNativeMethod(setAppName, arguments);
  }

  /**
   * Sets the trackers appVersion
   * @param {String} appVersion
   */
  setAppVersion(appVersion) {
    this.callNativeMethod(setAppVersion, arguments);
  }

  /**
   * Sets if AnonymizeIp is enabled
   * If enabled the last octet of the IP address will be removed
   * @param {Boolean} enabled
   */
  setAnonymizeIp(enabled) {
    this.callNativeMethod(setAnonymizeIp, arguments);
  }

  /**
   * Backwards compatibility for Single instance.
   * Proxy to static method.
   * @param enabled
   */
  setDryRun(enabled) {
    GoogleAnalyticsSettings.setDryRun(enabled);
  }


  /**
   * Backwards compatibility for Single instance.
   * Proxy to static method.
   * @param intervalInSeconds
   */
  setDispatchInterval(intervalInSeconds) {
    GoogleAnalyticsSettings.setDispatchInterval(intervalInSeconds);
  }


  /**
   * Backwards compatibility for Single instance.
   * Proxy to static method.
   * @param enabled
   */
  setOptOut(enabled) {
    GoogleAnalyticsSettings.setOptOut(enabled);
  }
}

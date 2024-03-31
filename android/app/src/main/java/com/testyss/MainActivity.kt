package com.testyss
import android.os.Bundle;

import org.devio.rn.splashscreen.SplashScreen; 

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   
    init {
        SplashScreen.show(this)
      }

   override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
    FacebookSdk.sdkInitialize(getApplicationContext());
  }
   */
  override fun getMainComponentName(): String = "testYSS"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}

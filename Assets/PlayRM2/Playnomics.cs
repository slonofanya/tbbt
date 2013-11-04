using UnityEngine;
using System.Collections;
using PlaynomicsPlugin;


public class Playnomics : PlaynomicsInternal
{
	/// <summary>
	/// gets the ANDROID_ID (Android) or the Mac address (iOS)
	/// </summary>
	protected override string getUniqueIdentifier()
	{
#if UNITY_EDITOR
		return "UnityEditor-" + Application.loadedLevelName;
#elif UNITY_ANDROID
		using( var pluginClass = new AndroidJavaClass( "com.playnomics.PlaynomicsPlugin" ) )
			return pluginClass.CallStatic<string>( "getAndroidId" );
#elif UNITY_IPHONE
		return _playnomicsMacAddress();
#else
		return SystemInfo.deviceUniqueIdentifier;
#endif
	}
}

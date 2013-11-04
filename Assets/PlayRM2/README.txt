
PLAYRM SDK CONFIGURATION DOCUMENTATION					v1.0

The Playnomics Unity SDK supports Unity applications built for Browsers, iOS, and Android. Integration of the PlayRM SDK into existing or new Unity games involves registering your game with the PlayRM service and properly configuring the SDK. The SDK sends data to the PlayRM control panel (https://controlpanel.playnomics.com) which creates player segments. The SDK includes several modules which track different player information. 

- Engagement Module - collects geography and engagement information
- User Info Module - provides basic user information
- Monetization Module - tracks various monetization events
- Viral Module - tracks the social activities of users

The first two modules are initialized at or near the beginning of the play session, and the other modules are event driven.  The Engagement Module must be called for the API to work, however not every module will be appropriate for each application.

STEP 1: Sign up for the PlayRM Service 
If you do not already have an account visit  
https://controlpanel.playnomics.com/signup 
and create one. The control panel is the interface to manage all PlayRM features once the API code snippets have been added to the game.

STEP 2: Register Your Game or Application
After receiving a registration confirmation email, login to the control panel at
https://controlpanel.playnomics.com
Select the "Applications" Tab and create a new application. You will receive an Application ID and an API KEY.

STEP 3: Import the PlayRM package into your Unity application

STEP 4: Initialize the PlayRM engagement module
Include the Plugin in your script:

  using PlaynomicsPlugin;

When the application first starts, call either:

  Playnomics.instance.startPlaynomics(<PLAYNOMICS-APPLICATION-ID>, <USERID>);

  Playnomics.instance.startPlaynomics(<PLAYNOMICS-APPLICATION-ID>);

    - <PLAYNOMICS-APPLICATION-ID> should be a literal long obtained in step 2.  
    - <USERID> should be a string containing the user's application specific ID.
      This may not be a Facebook ID, however it may be the Facebook 3rd Party ID
    - This ID should be anonymous and not an email address or user name.  
      Hashing an identifiable user ID will produce a usable anonymous ID.
    - Some applications use an auto-generated ID number from their database.
    - If the application does not have any ID, use the function call without 
      a <USERID> argument and Playnomics will automatically generate 
      a best-effort ID

A typical example initialization:

  using UnityEngine;
  using PlaynomicsPlugin;

  public class YourUI : MonoBehaviour {
    void Start() {
      Playnomics.instance.start(1234567890123456789L, "Z6q3UAtVwcxw35p9y");
    }
    ...
  }

STEP 5: Call User Info module
This event will be used to segment users based on how/where they were acquired.
This call should be made once per session:

  Playnomics.instance.userInfo(string country, string subdivision, 
  string sex, string birthyear, string source, string sourceCampaign, 
  Int64 installTime)

    - Playnomics is able to determine geographic location using IP address, 
      thus country and subdivision are often set to null
    - If any of the parameters are not available use null and only provide 
      available parameters

STEP 6: Call Monetization module
PlayRM tracks several types of monetization events. This module needs to be called every time a player triggers a monetization event. The cases below are the most common uses.

A. Purchases of In-Game Currency with Real Currency
This event identifies users that have monetized and the total real currency (Facebook Credits/FBC#) they have spent.

Each time the user purchases an in-game currency track the purchase using the call:

  Playnomics.instance.transaction(Int64 transactionId, 
  TransactionType.CurrencyConvert, TransactionCurrency[]transactionCurrencies,
  null, null, null)
    - transactionId is any unique identifier for this transaction 
      (or use a random number if nothing is available)
    - transactionCurrencies is an array formed with 2 elements representing 
      the in-game currency being purchased and the real currency being spent
    
    TransactionCurrency.createReal(double currencyValue, CurrencyType type)
      - type is either USD or FBC
      - currencyValue is a negative number representing the cost to 
        the user in USD or FBC

    TransactionCurrency createVirtual(double currencyValue, string type)
      - type is a short name (up to 16 characters) for the currency 
        being purchased, if there are multiple currencies, each should 
        have a unique name
      - currencyValue is a positive number for the quantity of the game 
        currency being purchased (e.g. 2000)

B. Purchases of Items with Real Currency
A continuation of the monetization data from case A.â€¨Each time the user purchases an item directly w/ a real currency, track the purchase using the call:

  Playnomics.instance.transaction(Int64 transactionId, TransactionType.BuyItem,
  TransactionCurrency[]transactionCurrencies, string itemId, int quantity, null)
    - transactionId is any unique identifier for this transaction (or use a 
      random number if nothing is available)
    - itemId is an identifier for the item, two users purchasing the same item
      should have the same itemId reported (e.g., 3984 or "Item3984" or
      â"Sword1")
    - quantity is the number of items being purchased
    - transactionCurrencies is an array with 1 element representing the 
      amount of real currency being spent
        TransactionCurrency.createReal(double currencyValue, CurrencyType type)
          - type is either USD or FBC
          - currencyValue is a positive number for the quantity of the game 
            currency being purchased (e.g. 2000)

STEP 6: Call Viral Module (event driven)
This module allows you to track player virality.

A. Track each invitation from one user to another (e.g., inviting friends to be neighbors in the game), with the call (if multiple requests are sent at the same time, such as through the Facebook friend selector, a separate function call should be made for each recipient)

  void Playnomics.instance.invitationSent(Int64 invitationId, string 
  recipientUserId, null, null)
    - invitationId is any unique 64-bit numeric identifier for this 
      invitation, if no identifier is available, this could be a 
      hash/MD5/SHA1 of the sender's and neighbor's Facebook ID 
      concatenated. The resulting identifier can not be personally 
      identifiable.
    - recipientUserId is this can be a hash/MD5/SHA1 of the recipient's 
      Facebook ID or their Facebook 3rd Party ID or an internal ID. 
      It can not be a personally identifiable ID.

B. Track each invitation acceptance using the call (preferably from the sender's game):

  void Playnomics.instance.invitationResponse(Int64 invitationId, string 
  recipientUserId)
    - invitationId is the ID of the corresponding invitation sent event
    - recipientUserId is the recipient ID used in the corresponding 
      invitation sent event

SUPPORT AND QUESTIONSYou may contact PlayRM support at any time at support@playnomics.com.




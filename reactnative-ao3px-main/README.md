# reactnative-ao3px

Alexis Osipovs, ao3px

__Special Features:__

Please run `npm install` to download all dependencies and libraries needed to run my application once you have cloned my repo. You may also need to install dependencies for the community checkbox I implemented, `npm install @react-native-community/checkbox --save`. Then you may run my application using `npx react-native start` and `npx react-native run-android`. 

Note: If you receive an error like `TypeError: Cannot read property "id" of null` I believe that is because of my useEffect. Please comment it out while you add a new item and then uncomment it afterward. My useEffect includes ‘isfocused’ in order to refresh the homepage when new data is added, but in the beginning, it may try to refresh before any data has been implemented. I realized this may happen when you first install my application, but I assure you that the app does work and displays 3 items on its first launch and will continually update the homepage once you have the useEffect uncommented.

To add a new item to the list, please double click on the floating `+` icon in the top right of the screen. To edit an item, you can select it and either click save or the back button.


__Lessons Learned:__

I wanted to challenge myself and use React Native for my first mobile application, and I have learned a lot about the benefits of coding cross-platform mobile applications. Needless to say, this platform has been difficult to work with, but overall provides a lot of flexibility through its use of JavaScript. It is very convenient to use JS and CSS together to create the style of the application, rather than needing to create and connect elements through an interface builder. I have also learned how helpful, yet very difficult, AsyncStorage is. In the beginning, I was trying to store string values and had a hard time having it properly save the data. Once I switched to using an object implementation, it was much easier not only to store but to understand how AsyncStorage was storing the data. Programming with objects made my code much more clear and I was then able to definitively see the stored input from the user. For an app like mine that is on such a small scale, AsyncStorage was much more beneficial than incorporating database functionalities using SQLite or other variations. A downside to React Native was that I often needed to install community objects and oftentimes they did not work. When implementing a checkbox, React has discontinued the one they previously had integrated into their system, so I had to find a community version instead that had less documentation and tutorials. When I tried to install a Date Picker, I also ran into the same issue, but at a greater expense. Whenever I tried installing community DatePickers, I ran into large errors that lead to me needing to re-clone my repo and start over. This taught me that I needed to commit to my repo more frequently while my code was working, just in case I needed to delete and re-clone again. 

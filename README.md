# Waldo
A phototagging app that requires the user to correctly identify four characters in a Where's Waldo drawing. 

## Play
Using the crosshairs, the user must select a point that is within 5% of the image hypoteneuse of the *true* location of the character. Then, using the dropdown menu, the user must select the identity of the character.

## Code
This website has a separate frontend and backend. The JS frontend contains the image and the logic for selection, while the Sinatra backend validates the position and identity chosen by the user. Since making an AJAX request to a different server breaks many browsers' same-origin policy, the code here is failsafe and the locations are hardcoded into the frontend.

## Future
  * Obviously, hardcoding the locations of the characters in the frontend is not very secure and it would be desirable to remove all sensitive information to the backend. This could be accomplished by hosting the entire page on a server
  * This frontend could be attached to a much more powerful backend to enable custom tagging and image upload.

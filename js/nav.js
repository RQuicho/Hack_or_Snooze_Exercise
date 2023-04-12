"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents(); // at main.js
  putStoriesOnPage(); // at stories.js
}

$body.on("click", "#nav-all", navAllStories);

/** When user clicks submit, submit form shows */

const navSubmitStoryClick = (evt) => {
  console.debug("navSubmitStoryClick", evt);
  hidePageComponents(); // at main.js
  $allStoriesList.show(); // at main.js
  $submitForm.show(); // at main.js
}

$navSubmitStory.on("click", navSubmitStoryClick);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents(); // at main.js
  $loginForm.show(); // at main.js
  $signupForm.show(); // at main.js
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}



"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories(); // at models.js
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName(); // at models.js
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/** Gets data from submit story form */

async function submitNewStory(e) {
  console.debug("getStoryDataOnSubmit");
  e.preventDefault();

  const title = $('#submit-title').val();
  const author = $('#submit-author').val();
  const url = $('#submit-url').val();
  const username = currentUser.username;
  const storyData = {title, author, url, username};

  const story = await storyList.addStory(currentUser, storyData); // at models.js

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $submitForm.trigger('reset');
  $submitForm.hide();
}

$submitForm.on('submit', submitNewStory);


/** Adds Favorites list to page  */

async function addFavoritesListOnPage() {
  console.debug('addFavoritesListOnPage');

  $favoriteStories.empty();

  if(currentUser.favorites.length === 0) {
    $favoriteStories.append("<h5>No favorites have been added</h5>");
  } else {
    // loop through all of favorite stories and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoriteStories.append($story);
    }
  }

  $favoriteStories.show();
}

/** Toggles Favorites list on page  */

async function toggleFavoriteStory(e) {
  console.debug('toggleFavoriteStory');

  const $tgt = $(e.target);
  const $closestLi = $tgt.closest('li');
  const storyId = $closestLi.attr('id');
  const story = storyList.stories.find(s => s.storyId === storyId);

  if($tgt.hasClass('fas')) {
    await currentUser.removeFavorite(story);
    $tgt.closest('i').toggleClass('fas far');
  } else {
    await currentUser.addFavorite(story);
    $tgt.closest('i').toggleClass('fas far');    
  }
}

$storiesLists.on('click', '.star', toggleFavoriteStory);
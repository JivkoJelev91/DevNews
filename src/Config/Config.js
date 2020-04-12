export const url = 'http://46.249.67.245:85';

export const baseStaticUrl = 'http://46.249.67.245:86/v1/p/';

// http://api.devnews.world/test


// user APIS

/**
   * PATH: http://46.249.67.245:85/users/get-or-create-profile 
   * Method: POST 
   * Parameters: { 
   *   platform: 'facebook',  // Possible platforms for devnews are facebook, google, github 
   *   profile: profile - profile must be Object with user details
   * }
   * 
   * @returns {object} with user Details. Token must be saved from the response!
   */

/**
 * PATH: http://46.249.67.245:85/users/profile 
 * Method: GET
 * Parameters: token , must present in Authorization header
 * @returns {object} with user Details
 */


 // POST apis

/**
 * PATH: http://46.249.67.245:85/posts/create-draft-post
 * Method: POST
 */

 
 /**
 * PATH: http://46.249.67.245:85/posts/cover-image 
 * Method: POST
 * Parameters: formData with image details
 * @returns {object} with image Details
 */

/**
 * PATH:  http://46.249.67.245:85/posts/feed
 * Method: GET
 * @returns {object} with arrays which presents all posts
 */

 /**
 * PATH:   http://46.249.67.245:85/posts/get-draft-post/:id
 * Method: GET
 * Parameters: id
 * @returns {object} with current post details
 */

 // Comment API

// /comments/submit-comment


/**
 * @jest-environment jsdom
 */

import commentCounter from './commentCounter.js';

test('Test that the amount of coments is correct', () => {
  document.body.innerHTML = '<li class="comments-counter">'
    + '</li>'
    + '<li class="comments-counter">'
    + '</li>';

  expect(commentCounter()).toEqual(2);
});

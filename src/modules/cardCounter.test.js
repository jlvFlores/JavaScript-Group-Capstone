/**
 * @jest-environment jsdom
 */

import cardCounter from './cardCounter.js';

test('Test that the amount of card is correct', () => {
  document.body.innerHTML = '<div class="card">'
    + '</div>'
    + '<div class="card">'
    + '</div>';

  expect(cardCounter()).toEqual(2);
});
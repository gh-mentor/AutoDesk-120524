import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';

// Polyfill for the global object if needed
if (typeof global === 'undefined') {
  global = window;
}
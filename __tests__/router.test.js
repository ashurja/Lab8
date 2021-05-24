/**
 * @jest-environment jsdom
 */

import { TestScheduler } from '@jest/core'
import {pushToHistory} from '../scripts/router.js'

describe('Testing length and state of the history function', () => {
    test('testing settings', () => {
        let settings = pushToHistory('settings', 0); 
        expect(settings.length).toBe(history.length); 
        expect(settings.state).toBe(history.state); 
    });

    test('testing entry', () => {
        let entry = pushToHistory('entry', 5); 
        expect(entry.length).toBe(history.length); 
        expect(entry.state).toBe(history.state); 
    });

    test('testing default', () => {
        let home_page = pushToHistory('home_page', 3); 
        expect(home_page.length).toBe(history.length); 
        expect(home_page.state).toBe(history.state); 
    });
});
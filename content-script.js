/**
 * Quote Goat Content Script
 * Automatically wraps one random word per header (h1, h2, h3) in scare quotes
 */

(function() {
    'use strict';
    
    const CONFIG = {
        targetTags: ['h1', 'h2', 'h3'],
        minWordLength: 2,
        quoteChar: '"',
        logPrefix: '[Quote Goat]'
    };
    
    const processedElements = new WeakSet();
    let totalQuotesAdded = 0;
    
    /**
     * Logs messages to console with Quote Goat prefix
     * @param {string} message - Message to log
     * @param {string} level - Log level (log, warn, error)
     */
    function log(message, level = 'log') {
        console[level](`${CONFIG.logPrefix} ${message}`);
    }
    
    /**
     * Checks if a word is valid for quoting
     * @param {string} word - Word to validate
     * @returns {boolean} - True if word can be quoted
     */
    function isValidWord(word) {
        if (!word || typeof word !== 'string') return false;
        
        const cleanWord = word.replace(/[.,!?;:()[\]{}'"]/g, '');
        return cleanWord.length >= CONFIG.minWordLength;
    }
    
    /**
     * Splits text into words while preserving whitespace and punctuation context
     * @param {string} text - Text to split
     * @returns {Array} - Array of word objects with text and position info
     */
    function parseTextIntoWords(text) {
        const words = [];
        const wordRegex = /\S+/g;
        let match;
        
        while ((match = wordRegex.exec(text)) !== null) {
            words.push({
                text: match[0],
                start: match.index,
                end: match.index + match[0].length
            });
        }
        
        return words;
    }
    
    /**
     * Selects a random valid word from an array of words
     * @param {Array} words - Array of word objects
     * @returns {Object|null} - Selected word object or null if none valid
     */
    function selectRandomWord(words) {
        const validWords = words.filter(word => isValidWord(word.text));
        
        if (validWords.length === 0) {
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * validWords.length);
        return validWords[randomIndex];
    }
    
    /**
     * Wraps a word with quotes in the original text
     * @param {string} originalText - Original text content
     * @param {Object} wordToQuote - Word object to quote
     * @returns {string} - Text with quoted word
     */
    function wrapWordWithQuotes(originalText, wordToQuote) {
        const beforeWord = originalText.substring(0, wordToQuote.start);
        const afterWord = originalText.substring(wordToQuote.end);
        const quotedWord = `${CONFIG.quoteChar}${wordToQuote.text}${CONFIG.quoteChar}`;
        
        return beforeWord + quotedWord + afterWord;
    }
    
    /**
     * Processes a single header element
     * @param {HTMLElement} element - Header element to process
     */
    function processHeaderElement(element) {
        if (processedElements.has(element)) {
            return;
        }
        
        const originalText = element.textContent;
        if (!originalText || originalText.trim().length === 0) {
            log(`Skipping empty header: ${element.tagName}`);
            return;
        }
        
        const words = parseTextIntoWords(originalText);
        if (words.length === 0) {
            log(`No words found in header: ${element.tagName}`);
            return;
        }
        
        const selectedWord = selectRandomWord(words);
        if (!selectedWord) {
            log(`No valid words to quote in header: ${element.tagName} - "${originalText}"`);
            return;
        }
        
        const quotedText = wrapWordWithQuotes(originalText, selectedWord);
        
        try {
            element.textContent = quotedText;
            processedElements.add(element);
            totalQuotesAdded++;
            
            log(`Quoted "${selectedWord.text}" in ${element.tagName}: "${quotedText}"`);
        } catch (error) {
            log(`Error updating header content: ${error.message}`, 'error');
        }
    }
    
    /**
     * Finds and processes all header elements on the page
     */
    function processAllHeaders() {
        const startTime = performance.now();
        let processedCount = 0;
        
        CONFIG.targetTags.forEach(tag => {
            const elements = document.querySelectorAll(tag);
            elements.forEach(element => {
                processHeaderElement(element);
                processedCount++;
            });
        });
        
        const endTime = performance.now();
        const processingTime = Math.round(endTime - startTime);
        
        log(`Processed ${processedCount} headers in ${processingTime}ms. Total quotes added: ${totalQuotesAdded}`);
    }
    
    /**
     * Handles dynamically added content using MutationObserver
     */
    function setupDynamicContentHandler() {
        const observer = new MutationObserver(mutations => {
            let hasNewHeaders = false;
            
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const isHeader = CONFIG.targetTags.includes(node.tagName?.toLowerCase());
                            const hasHeaders = node.querySelectorAll && 
                                             CONFIG.targetTags.some(tag => node.querySelectorAll(tag).length > 0);
                            
                            if (isHeader || hasHeaders) {
                                hasNewHeaders = true;
                            }
                        }
                    });
                }
            });
            
            if (hasNewHeaders) {
                clearTimeout(observer.debounceTimer);
                observer.debounceTimer = setTimeout(() => {
                    log('Processing dynamically added headers');
                    processAllHeaders();
                }, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        log('Dynamic content observer initialized');
    }
    
    /**
     * Main initialization function
     */
    function initialize() {
        log('Quote Goat initialized');
        
        processAllHeaders();
        
        setupDynamicContentHandler();
        
        if (totalQuotesAdded > 0) {
            log(`🐐 Quote Goat has added ${totalQuotesAdded} sarcastic quotes to this page!`);
        } else {
            log('No headers found to quote on this page');
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();

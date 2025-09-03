# Development Process & Learning Journey

## About This Project
**Project:** Book Finder Application  
**Company:** Aganitha Cognitive Solutions  
**Role:** Web Developer Candidate  
**Date:** 03/09/2025

## My Development Approach

This project was a fantastic learning experience where I encountered several technical challenges that helped me grow as a developer. Here's a breakdown of my development process and how I approached problem-solving.

### The Big Challenge: React Version Hell

I hit a major roadblock early on when my application kept failing with "502 Bad Gateway" errors. After some investigation, I discovered the issue was React version compatibility.

**What happened:**
- I had initially installed React 19.1.1
- But react-scripts 5.0.1 wasn't compatible yet
- The deployment kept failing silently

**How I solved it:**
I spent time researching React version compatibility and learned that:
- React 19 was very new (April 2024 release)
- Create React App (react-scripts) hadn't been updated to support it yet
- I needed to downgrade to React 18.2.0 for compatibility

The fix was simple once I understood the problem:
```bash
npm install react@^18.2.0 react-dom@^18.2.0
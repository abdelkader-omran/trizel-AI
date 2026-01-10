/**
 * TRIZEL-AI INTRO ANIMATION
 * Letter-by-letter reveal with meanings
 * First visit only, with skip control
 */

(function() {
  'use strict';
  
  // Check if intro has been shown before
  const introShown = sessionStorage.getItem('trizel_intro_shown');
  if (introShown === 'true') {
    return; // Skip intro if already shown this session
  }
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Letter meanings (EXACT as specified)
  const meanings = [
    { letter: 'T', title: 'Traceability', desc: 'verifiable provenance chains' },
    { letter: 'R', title: 'Reproducibility', desc: 'results rebuildable from archived inputs' },
    { letter: 'I', title: 'Immutability', desc: 'DOI / hash–based canonical records' },
    { letter: 'Z', title: 'Zero-Interpretation', desc: 'descriptive boundary; no interpretive claims' },
    { letter: 'E', title: 'Evidence-First', desc: 'evidence precedes narrative' },
    { letter: 'L', title: 'Layered Governance', desc: 'governance / execution separation' }
  ];
  
  // Create intro overlay
  const intro = document.createElement('div');
  intro.id = 'trizel-intro';
  intro.setAttribute('role', 'dialog');
  intro.setAttribute('aria-label', 'TRIZEL-AI Introduction');
  
  // Create skip button
  const skipBtn = document.createElement('button');
  skipBtn.className = 'intro-skip';
  skipBtn.textContent = 'Skip intro';
  skipBtn.setAttribute('aria-label', 'Skip introduction animation');
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'intro-content';
  
  // Create letters container
  const lettersContainer = document.createElement('div');
  lettersContainer.className = 'intro-letters';
  lettersContainer.setAttribute('aria-label', 'TRIZEL');
  
  // Create individual letter elements
  meanings.forEach(item => {
    const letter = document.createElement('div');
    letter.className = 'intro-letter';
    letter.textContent = item.letter;
    letter.setAttribute('aria-hidden', 'true');
    lettersContainer.appendChild(letter);
  });
  
  // Create meanings container
  const meaningsContainer = document.createElement('div');
  meaningsContainer.className = 'intro-meanings';
  meaningsContainer.setAttribute('aria-live', 'polite');
  
  // Create meaning items
  meanings.forEach(item => {
    const meaningDiv = document.createElement('div');
    meaningDiv.className = 'intro-meaning';
    
    const letterSpan = document.createElement('span');
    letterSpan.className = 'intro-meaning-letter';
    letterSpan.textContent = item.letter;
    
    const titleSpan = document.createElement('span');
    titleSpan.className = 'intro-meaning-title';
    titleSpan.textContent = item.title;
    
    const descSpan = document.createElement('span');
    descSpan.className = 'intro-meaning-desc';
    descSpan.textContent = item.desc;
    
    meaningDiv.appendChild(letterSpan);
    meaningDiv.appendChild(titleSpan);
    meaningDiv.appendChild(descSpan);
    meaningsContainer.appendChild(meaningDiv);
  });
  
  // Assemble structure
  content.appendChild(lettersContainer);
  content.appendChild(meaningsContainer);
  intro.appendChild(skipBtn);
  intro.appendChild(content);
  
  // Insert into DOM
  document.body.insertBefore(intro, document.body.firstChild);
  
  // Animation logic
  function runIntro() {
    const letters = intro.querySelectorAll('.intro-letter');
    const meaningItems = intro.querySelectorAll('.intro-meaning');
    
    if (prefersReducedMotion) {
      // Fast static display for reduced motion
      letters.forEach(letter => letter.classList.add('visible'));
      meaningsContainer.classList.add('visible');
      meaningItems.forEach(item => item.classList.add('visible'));
      
      // Quick fade out after 1.5s
      setTimeout(() => {
        endIntro();
      }, 1500);
      return;
    }
    
    // Letter-by-letter animation
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add('visible');
      }, index * 200); // 200ms delay between letters
    });
    
    // Show meanings container after all letters
    setTimeout(() => {
      meaningsContainer.classList.add('visible');
      
      // Animate meaning items one by one
      meaningItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 150); // 150ms delay between meaning items
      });
    }, letters.length * 200 + 400);
    
    // Auto-transition to homepage after completion
    const totalDuration = letters.length * 200 + 400 + meaningItems.length * 150 + 1800;
    setTimeout(() => {
      endIntro();
    }, totalDuration);
  }
  
  // End intro function
  function endIntro() {
    intro.classList.add('fade-out');
    sessionStorage.setItem('trizel_intro_shown', 'true');
    
    setTimeout(() => {
      if (intro.parentNode) {
        intro.parentNode.removeChild(intro);
      }
    }, 600); // Match fade-out transition duration
  }
  
  // Skip button handler
  skipBtn.addEventListener('click', endIntro);
  
  // Keyboard accessibility
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape' && intro.parentNode) {
      endIntro();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
  
  // Start animation after a brief delay
  setTimeout(() => {
    runIntro();
  }, 300);
  
})();

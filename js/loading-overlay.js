// Professional loading overlay for data loading
function showLoadingOverlay(message = 'Loading Health Data...') {
  const overlay = document.createElement('div');
  overlay.id = 'loadingOverlay';
  overlay.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);z-index:10000;display:flex;align-items:center;justify-content:center">
      <div style="background:linear-gradient(135deg,#ffffff,#f8fafc);padding:40px 50px;border-radius:20px;box-shadow:0 25px 50px rgba(0,0,0,0.25);text-align:center;border:1px solid rgba(255,255,255,0.2);max-width:400px">
        <div style="display:flex;align-items:center;justify-content:center;margin-bottom:24px">
          <div style="width:60px;height:60px;border-radius:15px;background:linear-gradient(135deg,#2563eb,#1e40af);display:flex;align-items:center;justify-content:center;margin-right:16px">
            <span class="material-icons" style="font-size:32px;color:white">analytics</span>
          </div>
          <div style="text-align:left">
            <div style="font-size:18px;font-weight:700;color:#1e293b;margin-bottom:4px">Insight360TN</div>
            <div style="font-size:12px;color:#64748b;font-weight:500">Health Analytics Platform</div>
          </div>
        </div>
        
        <div style="margin-bottom:20px">
          <div style="font-size:16px;font-weight:600;color:#374151;margin-bottom:8px">${message}</div>
          <div style="font-size:13px;color:#6b7280">Processing NFHS survey data...</div>
        </div>
        
        <div style="width:100%;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-bottom:16px">
          <div id="progressBar" style="height:100%;background:linear-gradient(90deg,#2563eb,#3b82f6);border-radius:3px;width:0%;transition:width 0.3s ease"></div>
        </div>
        
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;font-size:12px;color:#6b7280">
          <div style="width:8px;height:8px;background:#2563eb;border-radius:50%;animation:pulse 1.5s ease-in-out infinite"></div>
          <span id="loadingText">Initializing dashboard components</span>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 0.4; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    </style>
  `;
  
  document.body.appendChild(overlay);
  
  // Simulate progress
  let progress = 0;
  const progressBar = document.getElementById('progressBar');
  const loadingText = document.getElementById('loadingText');
  
  const steps = [
    'Initializing dashboard components',
    'Loading district boundaries',
    'Processing health indicators',
    'Calculating district rankings',
    'Preparing interactive maps',
    'Finalizing data visualization'
  ];
  
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = progress + '%';
    
    const stepIndex = Math.floor((progress / 100) * steps.length);
    if (stepIndex < steps.length) {
      loadingText.textContent = steps[stepIndex];
    }
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => hideLoadingOverlay(), 500);
    }
  }, 300);
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(0.95)';
    setTimeout(() => overlay.remove(), 300);
  }
}

// Auto-show loading on page load (only for production)
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  document.addEventListener('DOMContentLoaded', () => {
    showLoadingOverlay('Initializing Health Dashboard...');
  });
}
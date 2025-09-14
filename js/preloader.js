// Preloader for index.html - loads all main data files with progress
class DataPreloader {
  constructor() {
    this.files = [
      { url: './dashboard_files/master_nfhs_data.json', name: 'NFHS Health Data' },
      { url: './dashboard_files/nfhs_indicator_categories.json', name: 'Health Categories' },
      { url: './dashboard_files/tn_district.geojson', name: 'District Boundaries' }
    ];
    this.loadedFiles = {};
    this.currentProgress = 0;
  }

  showLoader() {
    const overlay = document.createElement('div');
    overlay.id = 'preloader';
    overlay.innerHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.95);backdrop-filter:blur(8px);z-index:10000;display:flex;align-items:center;justify-content:center">
        <div style="background:white;padding:40px;border-radius:20px;box-shadow:0 25px 50px rgba(0,0,0,0.25);text-align:center;min-width:400px">
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:24px">
            <div style="width:48px;height:48px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:12px;display:flex;align-items:center;justify-content:center">
              <span class="material-icons" style="font-size:28px;color:white">analytics</span>
            </div>
            <div>
              <div style="font-size:20px;font-weight:700;color:#0f172a">Insight360TN</div>
              <div style="font-size:12px;color:#64748b">Loading Health Data</div>
            </div>
          </div>
          
          <div style="background:#f1f5f9;border-radius:12px;padding:2px;margin-bottom:16px">
            <div id="progressBar" style="background:linear-gradient(90deg,#2563eb,#3b82f6);height:8px;border-radius:10px;width:0%;transition:width 0.3s ease"></div>
          </div>
          
          <div id="progressText" style="font-size:14px;color:#64748b;margin-bottom:8px">Initializing...</div>
          <div id="progressPercent" style="font-size:24px;font-weight:700;color:#2563eb">0%</div>
          
          <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:20px;font-size:12px;color:#94a3b8">
            <span class="material-icons" style="font-size:14px">info</span>
            <span>Loading 128 health indicators across 32 districts</span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  updateProgress(loaded, total, fileName) {
    const percent = Math.round((loaded / total) * 100);
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    
    if (progressBar) {
      progressBar.style.width = percent + '%';
      progressText.textContent = `Loading ${fileName}...`;
      progressPercent.textContent = percent + '%';
    }
  }

  hideLoader() {
    const overlay = document.getElementById('preloader');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transform = 'scale(0.95)';
      overlay.style.transition = 'all 0.3s ease';
      setTimeout(() => overlay.remove(), 300);
    }
  }

  async loadFile(fileConfig, index) {
    try {
      const response = await fetch(fileConfig.url);
      if (!response.ok) throw new Error(`Failed to load ${fileConfig.name}`);
      
      const data = await response.json();
      this.loadedFiles[fileConfig.url] = data;
      
      // Update progress
      const progress = ((index + 1) / this.files.length) * 100;
      this.updateProgress(index + 1, this.files.length, fileConfig.name);
      
      return data;
    } catch (error) {
      console.error(`Error loading ${fileConfig.name}:`, error);
      throw error;
    }
  }

  async preloadAll() {
    this.showLoader();
    
    try {
      // Load files sequentially with progress updates
      for (let i = 0; i < this.files.length; i++) {
        await this.loadFile(this.files[i], i);
        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Final progress update
      this.updateProgress(this.files.length, this.files.length, 'Complete');
      
      // Store in global scope for other scripts
      window.preloadedData = this.loadedFiles;
      
      // Hide loader after brief delay
      setTimeout(() => this.hideLoader(), 500);
      
      return this.loadedFiles;
    } catch (error) {
      console.error('Preloading failed:', error);
      // Hide loader even on error
      setTimeout(() => this.hideLoader(), 1000);
      throw error;
    }
  }
}

// Auto-start preloading when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const preloader = new DataPreloader();
    preloader.preloadAll();
  });
} else {
  const preloader = new DataPreloader();
  preloader.preloadAll();
}
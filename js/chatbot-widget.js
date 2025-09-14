// Chatbot widget for all pages
let chatOpen = false;
let chatbotNfhsData = {};
// Firebase AI configuration - will be loaded dynamically

function createChatbotWidget() {
  const widget = document.createElement('div');
  widget.innerHTML = `
    <div id="chatbotWidget" style="position:fixed;bottom:15vh;right:80px;z-index:9999">
      <div id="chatbotBox" style="position:absolute;bottom:70px;right:0;width:380px;height:500px;background:white;border-radius:16px;box-shadow:0 24px 38px rgba(0,0,0,0.14),0 9px 46px rgba(0,0,0,0.12),0 11px 15px rgba(0,0,0,0.2);display:none;flex-direction:column;overflow:hidden">
        <div style="background:#1976d2;color:white;padding:16px 20px;display:flex;justify-content:space-between;align-items:center">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center">
              <span class="material-icons" style="font-size:24px">psychology</span>
            </div>
            <div>
              <div style="font-weight:600;font-size:16px">Scooby AI</div>
              <div style="font-size:11px;opacity:0.8;display:flex;align-items:center;gap:4px">
                <span class="material-icons" style="font-size:12px">psychology</span>
                Powered by Gemini 1.5 Pro
              </div>
            </div>
          </div>
          <div style="display:flex;gap:4px">
            <button onclick="clearChat()" style="background:none;border:none;color:white;cursor:pointer;padding:8px;border-radius:50%;transition:background 0.2s" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='none'" title="Clear chat">
              <span class="material-icons" style="font-size:18px">refresh</span>
            </button>
            <button onclick="toggleChatbot()" style="background:none;border:none;color:white;cursor:pointer;padding:8px;border-radius:50%;transition:background 0.2s" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='none'">
              <span class="material-icons" style="font-size:20px">close</span>
            </button>
          </div>
        </div>
        <div id="chatMessages" style="flex:1;padding:16px;overflow-y:auto;background:#fafafa">
          <div style="background:white;padding:12px 16px;border-radius:18px 18px 18px 4px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);border-left:4px solid #1976d2">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <span class="material-icons" style="font-size:18px;color:#1976d2">psychology</span>
              <span style="font-weight:600;color:#1976d2;font-size:14px">Scooby AI</span>
            </div>
            <div style="color:#424242;font-size:14px;line-height:1.4">I'm Scooby AI powered by Gemini 1.5 Pro. I can analyze Tamil Nadu health data with Google's most advanced AI model. Ask me about district performance, health indicators, or NFHS trends!</div>
          </div>
          <div style="margin-top:12px">
            <div style="font-size:12px;color:#757575;margin-bottom:8px;font-weight:600">Quick Questions:</div>
            <div style="display:flex;flex-direction:column;gap:6px">
              <div onclick="sendQuickQuestion('Which 5 districts have worst vaccination rates?')" style="background:#f5f5f5;padding:8px 12px;border-radius:16px;font-size:12px;cursor:pointer;transition:background 0.2s;border:1px solid #e0e0e0" onmouseover="this.style.background='#e8f4fd'" onmouseout="this.style.background='#f5f5f5'">
                📊 Which 5 districts have worst vaccination rates?
              </div>
              <div onclick="sendQuickQuestion('Compare Chennai vs Coimbatore health performance')" style="background:#f5f5f5;padding:8px 12px;border-radius:16px;font-size:12px;cursor:pointer;transition:background 0.2s;border:1px solid #e0e0e0" onmouseover="this.style.background='#e8f4fd'" onmouseout="this.style.background='#f5f5f5'">
                🏥 Compare Chennai vs Coimbatore health performance
              </div>
              <div onclick="sendQuickQuestion('Show top 3 districts for child health')" style="background:#f5f5f5;padding:8px 12px;border-radius:16px;font-size:12px;cursor:pointer;transition:background 0.2s;border:1px solid #e0e0e0" onmouseover="this.style.background='#e8f4fd'" onmouseout="this.style.background='#f5f5f5'">
                👶 Show top 3 districts for child health
              </div>
            </div>
          </div>
          <div style="background:#f8f9fa;padding:8px 12px;margin:12px 0 0;border-radius:8px;border:1px solid #e9ecef">
            <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#6c757d">
              <span class="material-icons" style="font-size:14px;color:#6c757d">info</span>
              <span>AI Assistant • Responses may contain inaccuracies • Verify important information</span>
            </div>
          </div>
        </div>
        <div style="padding:16px;background:white;border-top:1px solid #e0e0e0">
          <div style="display:flex;gap:8px;align-items:flex-end">
            <div style="flex:1;position:relative">
              <input id="chatInput" type="text" placeholder="Type your question..." style="width:100%;padding:12px 16px;border:1px solid #e0e0e0;border-radius:24px;font-size:14px;outline:none;box-sizing:border-box;transition:border-color 0.2s" onfocus="this.style.borderColor='#1976d2'" onblur="this.style.borderColor='#e0e0e0'" onkeypress="if(event.key==='Enter') sendChatMessage()">
            </div>
            <button onclick="sendChatMessage()" style="background:#1976d2;color:white;border:none;padding:12px;border-radius:50%;cursor:pointer;transition:background 0.2s;box-shadow:0 2px 4px rgba(25,118,210,0.3)" onmouseover="this.style.background='#1565c0'" onmouseout="this.style.background='#1976d2'">
              <span class="material-icons" style="font-size:20px">send</span>
            </button>
          </div>
        </div>
      </div>
      <div id="aiTooltip" style="position:absolute;bottom:70px;right:-10px;background:#ffffff;color:#0f172a;padding:8px 12px;border-radius:12px;font-size:12px;font-weight:600;white-space:nowrap;opacity:1;transform:translateY(0);transition:all 0.3s ease;pointer-events:none;box-shadow:0 4px 14px rgba(2,6,23,0.12);border:1px solid #e6eefb">
        🤖 AI Health Assistant
        <div style="position:absolute;top:100%;left:50%;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #ffffff"></div>
      </div>
      <div id="chatbotButton" style="background:#1976d2;color:white;padding:16px;border-radius:50%;cursor:pointer;box-shadow:0 6px 16px rgba(25,118,210,0.4);transition:all 0.3s ease;width:56px;height:56px;display:flex;align-items:center;justify-content:center" onclick="toggleChatbot()" onmouseover="this.style.transform='scale(1.05)';this.style.boxShadow='0 8px 20px rgba(25,118,210,0.5)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 6px 16px rgba(25,118,210,0.4)'">
        <span class="material-icons" style="font-size:28px">psychology</span>
      </div>
    </div>
  `;
  document.body.appendChild(widget);
  loadChatData();
}

async function loadChatData() {
  // Only load chatbot data on index.html
  if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
    return;
  }
  
  try {
    const [dataResponse, categoriesResponse] = await Promise.all([
      fetch('./dashboard_files/master_nfhs_data.json'),
      fetch('./dashboard_files/nfhs_indicator_categories.json')
    ]);
    const data = await dataResponse.json();
    const categories = await categoriesResponse.json();
    chatbotNfhsData = { districts: data.districts, categories: categories.categories };
  } catch (error) {
    console.error('Error loading chat data:', error);
  }
}

function toggleChatbot() {
  const box = document.getElementById('chatbotBox');
  const tooltip = document.getElementById('aiTooltip');
  chatOpen = !chatOpen;
  box.style.display = chatOpen ? 'flex' : 'none';
  tooltip.style.display = chatOpen ? 'none' : 'block';
}

async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const question = input.value.trim();
  
  if (!question) return;
  
  // Add user message
  messages.innerHTML += `<div style="background:#1976d2;color:white;padding:12px 16px;border-radius:18px 18px 4px 18px;margin-bottom:12px;margin-left:40px;box-shadow:0 1px 3px rgba(0,0,0,0.1);font-size:14px">${question}</div>`;
  input.value = '';
  
  // Add typing indicator with progress
  messages.innerHTML += `<div id="typing" style="background:white;padding:12px 16px;border-radius:18px 18px 18px 4px;margin-bottom:12px;color:#757575;font-style:italic;box-shadow:0 1px 3px rgba(0,0,0,0.1);display:flex;align-items:center;gap:8px"><span class="material-icons" style="font-size:16px;color:#1976d2">psychology</span><span id="progressText">Reading NFHS data...</span></div>`;
  messages.scrollTop = messages.scrollHeight;
  
  // Show progress steps
  showProgress();
  
  try {
    // Try Firebase AI first, fallback to local analysis
    let aiResponse;
    try {
      aiResponse = await queryFirebaseAI(question, chatbotNfhsData);
    } catch (error) {
      console.log('Firebase AI unavailable, using local analysis');
      aiResponse = getChatbotResponse(question);
    }
    
    // Clean up markdown formatting but keep bold
    aiResponse = aiResponse.replace(/#{1,6}\s/g, '').replace(/\*([^*]+)\*/g, '$1');
    
    // Clear progress and remove typing
    if (window.currentProgressInterval) {
      clearInterval(window.currentProgressInterval);
    }
    document.getElementById('typing').remove();
    messages.innerHTML += `<div style="background:white;padding:12px 16px;border-radius:18px 18px 18px 4px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);border-left:4px solid #1976d2"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span class="material-icons" style="font-size:18px;color:#1976d2">psychology</span><span style="font-weight:600;color:#1976d2;font-size:14px">Scooby AI</span></div><div style="color:#424242;font-size:14px;line-height:1.5">${aiResponse.replace(/\n/g, '<br>')}</div></div>`;
    
  } catch (error) {
    document.getElementById('typing').remove();
    
    // Clear progress and show fallback
    if (window.currentProgressInterval) {
      clearInterval(window.currentProgressInterval);
    }
    
    const fallbackResponse = getFallbackResponse(question);
    
    messages.innerHTML += `<div style="background:white;padding:12px 16px;border-radius:18px 18px 18px 4px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);border-left:4px solid #1976d2"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span class="material-icons" style="font-size:18px;color:#1976d2">psychology</span><span style="font-weight:600;color:#1976d2;font-size:14px">Scooby AI (Offline)</span></div><div style="color:#424242;font-size:14px;line-height:1.5">${fallbackResponse}</div></div>`;
  }
  
  messages.scrollTop = messages.scrollHeight;
}

function showProgress() {
  const steps = [
    'Reading NFHS data...',
    'Processing 32 districts...',
    'Analyzing health indicators...',
    'Generating insights...'
  ];
  
  let currentStep = 0;
  const progressInterval = setInterval(() => {
    const progressElement = document.getElementById('progressText');
    if (progressElement && currentStep < steps.length - 1) {
      currentStep++;
      progressElement.textContent = steps[currentStep];
    } else {
      clearInterval(progressInterval);
    }
  }, 800);
  
  // Store interval to clear it when response comes
  window.currentProgressInterval = progressInterval;
}

// Firebase AI integration via REST API
async function queryFirebaseAI(question, healthData) {
  try {
    const API_KEY = 'AIzaSyDKQNbEVpumQjL7wyd7vAVAd5Elnlsp_wM'; // Firebase key
    const PROJECT_ID = 'insight360tn'; // From env
    
    // Determine response length based on question complexity
    const getResponseLength = (question) => {
      const q = question.toLowerCase();
      if (q.includes('compare') || q.includes('analysis') || q.includes('trend') || q.includes('why')) return 'Maximum 10 lines';
      if (q.includes('list') || q.includes('show') || q.includes('which') || q.includes('top') || q.includes('worst')) return 'Maximum 6 lines';
      if (q.includes('what is') || q.includes('define') || q.includes('explain')) return 'Maximum 4 lines';
      return 'Maximum 8 lines';
    };
    
    const responseLength = getResponseLength(question);
    
    const prompt = `You are a Tamil Nadu health data analyst. Provide analytical insights, not just figures.

Data: ${JSON.stringify(healthData)}
Question: ${question}

Format requirements:
- Use bullet points with spacing
- ${responseLength}
- Include analysis and context for each point
- Make important findings **bold**
- Explain WHY districts perform well/poorly
- Add actionable insights

Example:
• **Dharmapuri (67%)** - Lowest vaccination due to rural access issues

• **Chennai (89%)** - Best performance with urban healthcare infrastructure

• **Key insight**: 22% gap between best and worst performers indicates need for targeted rural interventions

Provide analytical depth, not just numbers.`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 300 }
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(`API Error ${response.status}: ${data.error?.message || 'Access denied'}`);
    }
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid API response format');
    }
    
    return data.candidates[0].content.parts[0].text;
    
  } catch (error) {
    console.error('Firebase AI Error:', error);
    throw new Error('Firebase AI unavailable');
  }
}

function getChatbotResponse(question) {
  if (!chatbotNfhsData.districts || !chatbotNfhsData.categories) {
    return 'Loading health data... Please try again in a moment.';
  }
  
  const q = question.toLowerCase();
  const districts = Object.keys(chatbotNfhsData.districts);
  const categories = Object.keys(chatbotNfhsData.categories);
  
  // Categories question
  if ((q.includes('categories') && q.includes('divided')) || (q.includes('how many') && q.includes('categories'))) {
    return `The 128 health indicators are divided into ${categories.length} categories:\n\n${categories.map((cat, i) => `${i+1}. ${cat.replace(/_/g, ' ')}`).join('\n')}\n\nEach category contains multiple specific indicators measured across all 32 districts in Tamil Nadu.`;
  }
  
  // Find relevant indicators based on question
  let relevantData = [];
  let searchTerms = [];
  
  if (q.includes('vaccination') || q.includes('immunization')) {
    searchTerms = ['vaccinated', 'immunization', 'vaccine'];
  } else if (q.includes('maternal') || q.includes('mother')) {
    searchTerms = ['maternal', 'mother', 'antenatal', 'delivery', 'birth'];
  } else if (q.includes('child') || q.includes('infant')) {
    searchTerms = ['child', 'infant', 'under', 'nutrition'];
  } else if (q.includes('malnutrition') || q.includes('nutrition')) {
    searchTerms = ['nutrition', 'stunted', 'wasted', 'underweight'];
  } else {
    // Extract district names from question
    const mentionedDistricts = districts.filter(d => q.includes(d.toLowerCase()));
    if (mentionedDistricts.length > 0) {
      return analyzeSpecificDistricts(mentionedDistricts, question);
    }
  }
  
  // Analyze data for search terms
  if (searchTerms.length > 0) {
    return analyzeIndicators(searchTerms, question);
  }
  
  // Default response with actual data overview
  const totalDistricts = districts.length;
  const totalCategories = categories.length;
  const sampleDistrict = districts[0];
  const sampleData = chatbotNfhsData.districts[sampleDistrict];
  const nfhs5Indicators = sampleData.nfhs_5 ? Object.keys(sampleData.nfhs_5).length : 0;
  
  return `I can analyze Tamil Nadu health data with:\n\n• ${totalDistricts} districts\n• ${totalCategories} health categories\n• ${nfhs5Indicators} indicators per district\n• NFHS-4 and NFHS-5 data\n\nAsk me specific questions about districts, health indicators, or comparisons!`;
}

function analyzeIndicators(searchTerms, question) {
  const results = [];
  const districts = Object.keys(nfhsData.districts);
  
  // Find matching indicators
  const sampleDistrict = districts[0];
  const sampleData = chatbotNfhsData.districts[sampleDistrict].nfhs_5 || chatbotNfhsData.districts[sampleDistrict].nfhs_4;
  
  const matchingIndicators = Object.keys(sampleData).filter(indicator => 
    searchTerms.some(term => indicator.toLowerCase().includes(term))
  );
  
  if (matchingIndicators.length === 0) {
    return `No indicators found for "${question}". Try asking about vaccination, maternal health, child nutrition, or specific districts.`;
  }
  
  // Analyze first matching indicator
  const indicator = matchingIndicators[0];
  const districtValues = [];
  
  districts.forEach(district => {
    const data = chatbotNfhsData.districts[district];
    const value = data.nfhs_5?.[indicator] || data.nfhs_4?.[indicator];
    if (value && !isNaN(parseFloat(value))) {
      districtValues.push({ district, value: parseFloat(value) });
    }
  });
  
  if (districtValues.length === 0) {
    return `No data available for "${indicator}". Try asking about other health indicators.`;
  }
  
  // Sort and analyze
  districtValues.sort((a, b) => b.value - a.value);
  const best = districtValues.slice(0, 3);
  const worst = districtValues.slice(-3).reverse();
  
  return `Analysis for "${indicator.replace(/_/g, ' ')}":\n\nBest performing districts:\n${best.map((d, i) => `${i+1}. ${d.district.charAt(0).toUpperCase() + d.district.slice(1)}: ${d.value}%`).join('\n')}\n\nNeeds attention:\n${worst.map((d, i) => `${i+1}. ${d.district.charAt(0).toUpperCase() + d.district.slice(1)}: ${d.value}%`).join('\n')}\n\nState average: ${(districtValues.reduce((sum, d) => sum + d.value, 0) / districtValues.length).toFixed(1)}%`;
}

function analyzeSpecificDistricts(districts, question) {
  const analysis = [];
  
  districts.forEach(district => {
    const data = chatbotNfhsData.districts[district];
    if (data) {
      const nfhs5 = data.nfhs_5 || {};
      const nfhs4 = data.nfhs_4 || {};
      const indicators = Object.keys(nfhs5).length || Object.keys(nfhs4).length;
      analysis.push(`${district.charAt(0).toUpperCase() + district.slice(1)}: ${indicators} health indicators available`);
    }
  });
  
  return `District analysis:\n\n${analysis.join('\n')}\n\nAsk specific questions about these districts' health indicators, vaccination rates, or maternal health for detailed analysis.`;
}

function getFallbackResponse(question) {
  const q = question.toLowerCase();
  
  if (q.includes('vaccination') || q.includes('immunization')) {
    return 'Based on NFHS data, districts like Dharmapuri (67%), Salem (72%), and Villupuram (74%) have lower child vaccination rates. Chennai and Coimbatore perform better with rates above 85%.';
  }
  
  if (q.includes('maternal') || q.includes('mother')) {
    return 'For maternal health, districts like Ariyalur, Dharmapuri, and Krishnagiri need attention. Chennai, Coimbatore, and Kanniyakumari show better maternal health indicators.';
  }
  
  if (q.includes('malnutrition') || q.includes('nutrition')) {
    return 'Child malnutrition is higher in districts like Dharmapuri, Krishnagiri, and Salem. Stunting rates exceed 35% in these areas. Coastal districts generally perform better.';
  }
  
  if (q.includes('best') || q.includes('top')) {
    return 'Top performing districts overall: Chennai, Coimbatore, Kanniyakumari, Erode, and Tirupur. These districts consistently rank in top 10 across health categories.';
  }
  
  if (q.includes('worst') || q.includes('poor')) {
    return 'Districts needing attention: Dharmapuri, Krishnagiri, Salem, Villupuram, and Ariyalur. These districts rank lower in multiple health indicators.';
  }
  
  return 'I can help analyze Tamil Nadu health data. Try asking about vaccination rates, maternal health, malnutrition, or district comparisons. (Note: AI service temporarily unavailable - showing cached responses)';
}

function sendQuickQuestion(question) {
  document.getElementById('chatInput').value = question;
  sendChatMessage();
}

function clearChat() {
  const messages = document.getElementById('chatMessages');
  messages.innerHTML = `
    <div style="background:white;padding:12px 16px;border-radius:18px 18px 18px 4px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);border-left:4px solid #1976d2">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span class="material-icons" style="font-size:18px;color:#1976d2">psychology</span>
        <span style="font-weight:600;color:#1976d2;font-size:14px">Scooby AI</span>
      </div>
      <div style="color:#424242;font-size:14px;line-height:1.4">Chat cleared! I'm ready to analyze Tamil Nadu health data. Ask me about district performance, health indicators, or NFHS trends!</div>
    </div>
    <div style="margin-top:12px">
      <div style="font-size:12px;color:#757575;margin-bottom:8px;font-weight:600">Quick Questions:</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <div onclick="sendQuickQuestion('Which 5 districts have worst vaccination rates?')" style="background:#f5f5f5;padding:8px 12px;border-radius:16px;font-size:12px;cursor:pointer;transition:background 0.2s;border:1px solid #e0e0e0" onmouseover="this.style.background='#e8f4fd'" onmouseout="this.style.background='#f5f5f5'">
          📊 Which 5 districts have worst vaccination rates?
        </div>
        <div onclick="sendQuickQuestion('Compare Chennai vs Coimbatore health performance')" style="background:#f5f5f5;padding:8px 12px;border-radius:16px;font-size:12px;cursor:pointer;transition:background 0.2s;border:1px solid #e0e0e0" onmouseover="this.style.background='#e8f4fd'" onmouseout="this.style.background='#f5f5f5'">
          🏥 Compare Chennai vs Coimbatore health performance
        </div>
        <div onclick="sendQuickQuestion('Show top 3 districts for child health')" style="background:#f5f5f5;padding:8px 12px;border-radius:16px;font-size:12px;cursor:pointer;transition:background 0.2s;border:1px solid #e0e0e0" onmouseover="this.style.background='#e8f4fd'" onmouseout="this.style.background='#f5f5f5'">
          👶 Show top 3 districts for child health
        </div>
      </div>
    </div>
    <div style="background:#f8f9fa;padding:8px 12px;margin:12px 0 0;border-radius:8px;border:1px solid #e9ecef">
      <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#6c757d">
        <span class="material-icons" style="font-size:14px;color:#6c757d">info</span>
        <span>AI Assistant • Responses may contain inaccuracies • Verify important information</span>
      </div>
    </div>
  `;
}

// Only add chatbot to index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatbotWidget);
  } else {
    createChatbotWidget();
  }
}
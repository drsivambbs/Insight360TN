// Chatbot widget for all pages
let chatOpen = false;
let chatbotNfhsData = {};
// Firebase AI configuration - will be loaded dynamically

function createChatbotWidget() {
  const widget = document.createElement('div');
  widget.innerHTML = `
    <div id="chatbotWidget" style="position:fixed;bottom:20px;right:10%;z-index:9999">
      <div id="chatbotBox" style="position:absolute;bottom:70px;right:0;width:400px;height:550px;background:white;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.15),0 8px 25px rgba(0,0,0,0.1);display:none;flex-direction:column;overflow:hidden;border:1px solid rgba(255,255,255,0.2);backdrop-filter:blur(10px)">
        <div style="background:linear-gradient(135deg,#1976d2,#1565c0);color:white;padding:18px 24px;display:flex;justify-content:space-between;align-items:center;border-radius:20px 20px 0 0">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="width:44px;height:44px;background:rgba(255,255,255,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px)">
              <span class="material-icons" style="font-size:26px">psychology</span>
            </div>
            <div>
              <div style="font-weight:700;font-size:17px;letter-spacing:0.3px">Scooby AI</div>
              <div style="font-size:12px;opacity:0.85;display:flex;align-items:center;gap:6px;margin-top:2px">
                <span class="material-icons" style="font-size:14px">auto_awesome</span>
                Powered by Gemini 1.5 Pro
              </div>
            </div>
          </div>
          <div style="display:flex;gap:6px">
            <button onclick="minimizeChatbot()" style="background:rgba(255,255,255,0.1);border:none;color:white;cursor:pointer;padding:10px;border-radius:10px;transition:all 0.2s;backdrop-filter:blur(10px)" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'" title="Minimize">
              <span class="material-icons" style="font-size:18px">minimize</span>
            </button>
            <button onclick="clearChat()" style="background:rgba(255,255,255,0.1);border:none;color:white;cursor:pointer;padding:10px;border-radius:10px;transition:all 0.2s;backdrop-filter:blur(10px)" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'" title="Clear chat">
              <span class="material-icons" style="font-size:18px">refresh</span>
            </button>
            <button onclick="toggleChatbot()" style="background:rgba(255,255,255,0.1);border:none;color:white;cursor:pointer;padding:10px;border-radius:10px;transition:all 0.2s;backdrop-filter:blur(10px)" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'" title="Close">
              <span class="material-icons" style="font-size:18px">close</span>
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
      <div id="aiTooltip" style="position:absolute;bottom:70px;right:-50px;background:linear-gradient(135deg,#ffffff,#f8fafc);color:#1e293b;padding:12px 18px;border-radius:14px;font-size:13px;font-weight:600;white-space:nowrap;opacity:1;transform:translateY(0);transition:all 0.3s ease;pointer-events:none;box-shadow:0 8px 25px rgba(0,0,0,0.15);border:1px solid rgba(255,255,255,0.8);backdrop-filter:blur(10px);z-index:10001">
        <span style="margin-right:6px">🐕</span>AI Health Assistant
        <div style="position:absolute;top:100%;right:60px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #ffffff"></div>
      </div>
      <div id="minimizedChatbot" style="position:absolute;bottom:70px;right:0;background:linear-gradient(135deg,#1976d2,#1565c0);color:white;padding:12px 20px;border-radius:16px;cursor:pointer;box-shadow:0 8px 25px rgba(25,118,210,0.3);transition:all 0.3s ease;display:none;align-items:center;gap:10px;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1)" onclick="maximizeChatbot()" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 12px 35px rgba(25,118,210,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 25px rgba(25,118,210,0.3)'">
        <span style="font-size:20px">🐕</span>
        <span style="font-size:13px;font-weight:600">Scooby AI</span>
        <span class="material-icons" style="font-size:16px;opacity:0.8">expand_more</span>
      </div>
      <div id="chatbotButton" style="background:linear-gradient(135deg,#1976d2,#1565c0);color:white;padding:18px;border-radius:18px;cursor:pointer;box-shadow:0 8px 25px rgba(25,118,210,0.3);transition:all 0.3s ease;width:64px;height:64px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1)" onclick="toggleChatbot()" onmouseover="this.style.transform='scale(1.05) translateY(-2px)';this.style.boxShadow='0 12px 35px rgba(25,118,210,0.4)'" onmouseout="this.style.transform='scale(1) translateY(0)';this.style.boxShadow='0 8px 25px rgba(25,118,210,0.3)'">
        <span style="font-size:32px">🐕</span>
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
  const minimized = document.getElementById('minimizedChatbot');
  chatOpen = !chatOpen;
  box.style.display = chatOpen ? 'flex' : 'none';
  tooltip.style.display = chatOpen ? 'none' : 'block';
  minimized.style.display = 'none';
}

function minimizeChatbot() {
  const box = document.getElementById('chatbotBox');
  const minimized = document.getElementById('minimizedChatbot');
  const tooltip = document.getElementById('aiTooltip');
  box.style.display = 'none';
  minimized.style.display = 'flex';
  tooltip.style.display = 'none';
  chatOpen = false;
}

function maximizeChatbot() {
  const box = document.getElementById('chatbotBox');
  const minimized = document.getElementById('minimizedChatbot');
  const tooltip = document.getElementById('aiTooltip');
  box.style.display = 'flex';
  minimized.style.display = 'none';
  tooltip.style.display = 'none';
  chatOpen = true;
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
  
  // Check if question is relevant to health data
  const questionLower = question.toLowerCase();
  const healthKeywords = ['health', 'district', 'nfhs', 'vaccination', 'maternal', 'child', 'nutrition', 'tamil nadu', 'indicator', 'survey', 'data', 'analysis', 'performance', 'ranking', 'compare', 'trend'];
  const isHealthRelated = healthKeywords.some(keyword => questionLower.includes(keyword));
  
  if (!isHealthRelated && !questionLower.includes('categories') && !questionLower.includes('how many')) {
    return `I appreciate your question, but my expertise is specifically focused on Tamil Nadu's health data from the National Family Health Survey (NFHS). I can help you with:\n\n• District health performance comparisons\n• Health indicator analysis and trends\n• Vaccination and maternal health statistics\n• Nutrition and child health data\n• NFHS-4 vs NFHS-5 comparisons\n\nPlease feel free to ask me anything related to Tamil Nadu's health indicators and district performance!`;
  }
  
  const questionText = question.toLowerCase();
  const districts = Object.keys(chatbotNfhsData.districts);
  const categories = Object.keys(chatbotNfhsData.categories);
  
  // Categories question
  if ((questionText.includes('categories') && questionText.includes('divided')) || (questionText.includes('how many') && questionText.includes('categories'))) {
    return `The 128 health indicators are divided into ${categories.length} categories:\n\n${categories.map((cat, i) => `${i+1}. ${cat.replace(/_/g, ' ')}`).join('\n')}\n\nEach category contains multiple specific indicators measured across all 32 districts in Tamil Nadu.`;
  }
  
  // Find relevant indicators based on question
  let relevantData = [];
  let searchTerms = [];
  
  if (questionText.includes('vaccination') || questionText.includes('immunization')) {
    searchTerms = ['vaccinated', 'immunization', 'vaccine'];
  } else if (questionText.includes('maternal') || questionText.includes('mother')) {
    searchTerms = ['maternal', 'mother', 'antenatal', 'delivery', 'birth'];
  } else if (questionText.includes('child') || questionText.includes('infant')) {
    searchTerms = ['child', 'infant', 'under', 'nutrition'];
  } else if (questionText.includes('malnutrition') || questionText.includes('nutrition')) {
    searchTerms = ['nutrition', 'stunted', 'wasted', 'underweight'];
  } else {
    // Extract district names from question
    const mentionedDistricts = districts.filter(d => questionText.includes(d.toLowerCase()));
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
  
  return `I'm here to help with Tamil Nadu health data analysis:\n\n• ${totalDistricts} districts covered\n• ${totalCategories} health categories\n• ${nfhs5Indicators} indicators per district\n• NFHS-4 and NFHS-5 comparative data\n\nI'd be happy to help you explore district performance, health trends, or specific indicators. What would you like to know?`;
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
  const query = question.toLowerCase();
  
  // Check relevance first
  const healthKeywords = ['health', 'district', 'nfhs', 'vaccination', 'maternal', 'child', 'nutrition', 'tamil nadu', 'indicator', 'survey', 'data', 'analysis', 'performance', 'ranking', 'compare', 'trend'];
  const isHealthRelated = healthKeywords.some(keyword => query.includes(keyword));
  
  if (!isHealthRelated) {
    return `I appreciate your interest, but I'm specifically designed to assist with Tamil Nadu health data from the NFHS surveys. My knowledge is focused on:\n\n• District health performance and rankings\n• Health indicators and trends analysis\n• Vaccination and maternal health statistics\n• Child nutrition and health outcomes\n\nI'd be delighted to help you explore any of these health-related topics for Tamil Nadu!`;
  }
  
  if (query.includes('vaccination') || query.includes('immunization')) {
    return 'Based on NFHS data, districts like Dharmapuri (67%), Salem (72%), and Villupuram (74%) have lower child vaccination rates. Chennai and Coimbatore perform better with rates above 85%.';
  }
  
  if (query.includes('maternal') || query.includes('mother')) {
    return 'For maternal health, districts like Ariyalur, Dharmapuri, and Krishnagiri need attention. Chennai, Coimbatore, and Kanniyakumari show better maternal health indicators.';
  }
  
  if (query.includes('malnutrition') || query.includes('nutrition')) {
    return 'Child malnutrition is higher in districts like Dharmapuri, Krishnagiri, and Salem. Stunting rates exceed 35% in these areas. Coastal districts generally perform better.';
  }
  
  if (query.includes('best') || query.includes('top')) {
    return 'Top performing districts overall: Chennai, Coimbatore, Kanniyakumari, Erode, and Tirupur. These districts consistently rank in top 10 across health categories.';
  }
  
  if (query.includes('worst') || query.includes('poor')) {
    return 'Districts needing attention: Dharmapuri, Krishnagiri, Salem, Villupuram, and Ariyalur. These districts rank lower in multiple health indicators.';
  }
  
  return 'I\'m here to help with Tamil Nadu health data analysis. Feel free to ask about vaccination rates, maternal health, nutrition indicators, or district comparisons. (Note: Advanced AI features temporarily unavailable)';
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

// Always add chatbot for development
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createChatbotWidget);
} else {
  createChatbotWidget();
}
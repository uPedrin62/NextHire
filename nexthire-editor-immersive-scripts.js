// NextHire Editor Immersive - Scripts Completos

// ========== OPENING 3D ==========
let openingScene, openingCamera, openingRenderer, openingCrystal;
let openingActive = true;

function initOpening() {
    const container = document.getElementById('opening-screen');
    const canvas = document.getElementById('opening-canvas');
    
    // Three.js Scene
    openingScene = new THREE.Scene();
    openingCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    openingRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    
    openingRenderer.setSize(window.innerWidth, window.innerHeight);
    openingRenderer.setClearColor(0x0a0a0a, 1);
    
    // Criar esfera energética
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00bfff,
        emissive: 0x00bfff,
        emissiveIntensity: 0.5,
        shininess: 100,
        wireframe: true
    });
    openingCrystal = new THREE.Mesh(geometry, material);
    openingScene.add(openingCrystal);
    
    // Iluminação
    const pointLight = new THREE.PointLight(0x00bfff, 2, 100);
    pointLight.position.set(5, 5, 5);
    openingScene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    openingScene.add(ambientLight);
    
    openingCamera.position.z = 5;
    
    // Animação
    animateOpening();
    
    // GSAP Timeline
    const tl = gsap.timeline();
    
    tl.to('#opening-text', { opacity: 1, y: 0, duration: 1 })
      .to(openingCamera.position, { z: 2, duration: 2, ease: 'power2.inOut' })
      .to('#opening-screen', {
          opacity: 0,
          duration: 1,
          delay: 1,
          onComplete: () => {
              container.style.display = 'none';
              document.getElementById('main-app').style.display = 'block';
              gsap.to('#main-app', { opacity: 1, duration: 1 });
              initEditor();
          }
      });
    
    // Skip button
    document.getElementById('skip-opening').addEventListener('click', () => {
        tl.kill();
        gsap.to('#opening-screen', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                container.style.display = 'none';
                document.getElementById('main-app').style.display = 'block';
                gsap.to('#main-app', { opacity: 1, duration: 0.5 });
                initEditor();
            }
        });
    });
}

function animateOpening() {
    if (!openingActive) return;
    
    requestAnimationFrame(animateOpening);
    
    openingCrystal.rotation.x += 0.01;
    openingCrystal.rotation.y += 0.02;
    
    openingRenderer.render(openingScene, openingCamera);
}

// ========== PARTICLES 3D ==========
let particlesScene, particlesCamera, particlesRenderer, particleSystem;

function initParticles3D() {
    const canvas = document.getElementById('particles-3d');
    
    particlesScene = new THREE.Scene();
    particlesCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    particlesRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    
    particlesRenderer.setSize(window.innerWidth, window.innerHeight);
    particlesRenderer.setClearColor(0x000000, 0);
    
    // Criar partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x00bfff,
        transparent: true,
        opacity: 0.6
    });
    
    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesScene.add(particleSystem);
    
    particlesCamera.position.z = 50;
    
    animateParticles3D();
}

let mouseX = 0, mouseY = 0;

function animateParticles3D() {
    requestAnimationFrame(animateParticles3D);
    
    particleSystem.rotation.y += 0.001;
    particleSystem.rotation.x = mouseY * 0.0001;
    particleSystem.rotation.y = mouseX * 0.0001;
    
    particlesRenderer.render(particlesScene, particlesCamera);
}

// ========== CUSTOM CURSOR ==========
function initCustomCursor() {
    const cursor = document.getElementById('cursor-editor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        mouseX = e.clientX - window.innerWidth / 2;
        mouseY = e.clientY - window.innerHeight / 2;
    });
    
    document.querySelectorAll('button, a, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ========== EDITOR FUNCTIONS ==========
let currentZoom = 1;
let cvData = {
    personalInfo: {},
    experience: [],
    education: [],
    skills: [],
    template: 'minimal-clean'
};

function initEditor() {
    initCustomCursor();
    initParticles3D();
    loadEditorTab();
    loadTemplatesTab();
    loadAITab();
    renderCV();
}

function switchTab(tabName) {
    // Remove active class
    document.querySelectorAll('.tab-btn-immersive').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content-immersive').forEach(content => content.classList.remove('active'));
    
    // Add active class
    event.target.closest('.tab-btn-immersive').classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

function loadEditorTab() {
    const editorTab = document.getElementById('tab-editor');
    editorTab.innerHTML = `
        <div class="form-section-immersive">
            <h3><i class="fas fa-user"></i> Informações Pessoais</h3>
            <div class="form-group-immersive">
                <label>Nome Completo</label>
                <input type="text" id="fullName" class="form-control-immersive" placeholder="João Silva">
            </div>
            <div class="form-group-immersive">
                <label>Email</label>
                <input type="email" id="email" class="form-control-immersive" placeholder="joao@email.com">
            </div>
            <div class="form-group-immersive">
                <label>Telefone</label>
                <input type="tel" id="phone" class="form-control-immersive" placeholder="+351 912 345 678">
            </div>
            <div class="form-group-immersive">
                <label>Localização</label>
                <input type="text" id="location" class="form-control-immersive" placeholder="Lisboa, Portugal">
            </div>
        </div>
        
        <div class="form-section-immersive">
            <h3><i class="fas fa-briefcase"></i> Experiência Profissional</h3>
            <div id="experience-list"></div>
            <button class="btn-immersive" onclick="addExperience()">
                <i class="fas fa-plus"></i> Adicionar Experiência
            </button>
        </div>
        
        <div class="form-section-immersive">
            <h3><i class="fas fa-graduation-cap"></i> Formação Académica</h3>
            <div id="education-list"></div>
            <button class="btn-immersive" onclick="addEducation()">
                <i class="fas fa-plus"></i> Adicionar Formação
            </button>
        </div>
        
        <div class="form-section-immersive">
            <h3><i class="fas fa-star"></i> Competências</h3>
            <div id="skills-list"></div>
            <button class="btn-immersive" onclick="addSkill()">
                <i class="fas fa-plus"></i> Adicionar Competência
            </button>
        </div>
    `;
    
    // Add event listeners
    ['fullName', 'email', 'phone', 'location'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateCV);
    });
}

function loadTemplatesTab() {
    const templatesTab = document.getElementById('tab-templates');
    templatesTab.innerHTML = `
        <div class="templates-grid">
            <div class="template-card" onclick="selectTemplate('minimal-clean')">
                <div class="template-preview" style="background: linear-gradient(135deg, #2563eb, #1d4ed8);">
                    <i class="fas fa-file-alt"></i>
                </div>
                <h4>Minimalista</h4>
            </div>
            <div class="template-card" onclick="selectTemplate('corporate-blue')">
                <div class="template-preview" style="background: linear-gradient(135deg, #1e40af, #1e3a8a);">
                    <i class="fas fa-briefcase"></i>
                </div>
                <h4>Corporativo</h4>
            </div>
            <div class="template-card" onclick="selectTemplate('creative-gradient')">
                <div class="template-preview" style="background: linear-gradient(135deg, #e91e63, #9c27b0);">
                    <i class="fas fa-palette"></i>
                </div>
                <h4>Criativo</h4>
            </div>
        </div>
    `;
}

function loadAITab() {
    const aiTab = document.getElementById('tab-ai');
    aiTab.innerHTML = `
        <div class="ai-section">
            <h3><i class="fas fa-robot"></i> Assistente IA</h3>
            <p style="opacity: 0.7; margin-bottom: 1rem;">
                Use a IA para melhorar o seu CV automaticamente.
            </p>
            <button class="btn-primary-immersive" onclick="improveWithAI()">
                <i class="fas fa-magic"></i> Melhorar com IA
            </button>
        </div>
    `;
}

function updateCV() {
    cvData.personalInfo = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value
    };
    renderCV();
}

function renderCV() {
    const preview = document.getElementById('cvPreview');
    preview.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h1 style="color: #00bfff; margin-bottom: 0.5rem;">${cvData.personalInfo.fullName || 'Seu Nome'}</h1>
            <p style="color: #666;">${cvData.personalInfo.email || 'email@exemplo.com'} | ${cvData.personalInfo.phone || '+351 912 345 678'}</p>
            <p style="color: #666;">${cvData.personalInfo.location || 'Lisboa, Portugal'}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h2 style="color: #00bfff; border-bottom: 2px solid #00bfff; padding-bottom: 0.5rem;">Experiência Profissional</h2>
            ${cvData.experience.length ? cvData.experience.map(exp => `
                <div style="margin-top: 1rem;">
                    <h3 style="color: #333;">${exp.title}</h3>
                    <p style="color: #666;">${exp.company} | ${exp.period}</p>
                    <p>${exp.description}</p>
                </div>
            `).join('') : '<p style="color: #999;">Nenhuma experiência adicionada</p>'}
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h2 style="color: #00bfff; border-bottom: 2px solid #00bfff; padding-bottom: 0.5rem;">Formação Académica</h2>
            ${cvData.education.length ? cvData.education.map(edu => `
                <div style="margin-top: 1rem;">
                    <h3 style="color: #333;">${edu.degree}</h3>
                    <p style="color: #666;">${edu.institution} | ${edu.period}</p>
                </div>
            `).join('') : '<p style="color: #999;">Nenhuma formação adicionada</p>'}
        </div>
        
        <div>
            <h2 style="color: #00bfff; border-bottom: 2px solid #00bfff; padding-bottom: 0.5rem;">Competências</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                ${cvData.skills.length ? cvData.skills.map(skill => `
                    <span style="background: #00bfff; color: white; padding: 0.5rem 1rem; border-radius: 20px;">${skill}</span>
                `).join('') : '<p style="color: #999;">Nenhuma competência adicionada</p>'}
            </div>
        </div>
    `;
}

function addExperience() {
    const exp = {
        title: prompt('Cargo:'),
        company: prompt('Empresa:'),
        period: prompt('Período (ex: 2020-2023):'),
        description: prompt('Descrição:')
    };
    if (exp.title) {
        cvData.experience.push(exp);
        renderCV();
    }
}

function addEducation() {
    const edu = {
        degree: prompt('Curso:'),
        institution: prompt('Instituição:'),
        period: prompt('Período (ex: 2016-2020):')
    };
    if (edu.degree) {
        cvData.education.push(edu);
        renderCV();
    }
}

function addSkill() {
    const skill = prompt('Competência:');
    if (skill) {
        cvData.skills.push(skill);
        renderCV();
    }
}

function selectTemplate(template) {
    cvData.template = template;
    renderCV();
    alert(`Template "${template}" selecionado!`);
}

function zoomIn() {
    currentZoom = Math.min(currentZoom + 0.1, 2);
    document.getElementById('cvPreview').style.transform = `scale(${currentZoom})`;
    document.getElementById('zoomLevel').textContent = Math.round(currentZoom * 100) + '%';
}

function zoomOut() {
    currentZoom = Math.max(currentZoom - 0.1, 0.5);
    document.getElementById('cvPreview').style.transform = `scale(${currentZoom})`;
    document.getElementById('zoomLevel').textContent = Math.round(currentZoom * 100) + '%';
}

function saveCV() {
    localStorage.setItem('nexthire-cv', JSON.stringify(cvData));
    alert('✓ CV salvo com sucesso!');
}

function loadSavedCV() {
    const saved = localStorage.getItem('nexthire-cv');
    if (saved) {
        cvData = JSON.parse(saved);
        renderCV();
        alert('✓ CV carregado com sucesso!');
    } else {
        alert('Nenhum CV salvo encontrado.');
    }
}

function downloadPDF() {
    const element = document.getElementById('cvPreview');
    const opt = {
        margin: 0,
        filename: 'curriculo-nexthire.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

function analyzeCV() {
    alert('🤖 Análise de CV em desenvolvimento!');
}

function improveWithAI() {
    alert('🤖 Melhoria com IA em desenvolvimento!');
}

// ========== RESIZE HANDLER ==========
window.addEventListener('resize', () => {
    if (openingCamera) {
        openingCamera.aspect = window.innerWidth / window.innerHeight;
        openingCamera.updateProjectionMatrix();
        openingRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    if (particlesCamera) {
        particlesCamera.aspect = window.innerWidth / window.innerHeight;
        particlesCamera.updateProjectionMatrix();
        particlesRenderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// ========== INIT ==========
window.addEventListener('DOMContentLoaded', () => {
    initOpening();
});

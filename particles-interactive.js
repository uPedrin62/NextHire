// Partículas Interativas
(function() {
    // Verificar se é mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Não executar em mobile para performance
    
    // Criar canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Partículas
    const particles = [];
    const particleCount = 150; // Reduzido para melhor performance
    let mouseX = 0;
    let mouseY = 0;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.size = Math.random() * 2.5 + 0.5;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.baseVx = this.vx;
            this.baseVy = this.vy;
        }
        
        update() {
            // Movimento base mais fluido
            this.vx += (this.baseVx - this.vx) * 0.05;
            this.vy += (this.baseVy - this.vy) * 0.05;
            
            this.x += this.vx;
            this.y += this.vy;
            
            // Reação ao mouse mais suave e com maior alcance
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                const angle = Math.atan2(dy, dx);
                this.vx -= Math.cos(angle) * force * 0.5;
                this.vy -= Math.sin(angle) * force * 0.5;
            }
            
            // Adicionar movimento ondulante
            this.vx += Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.02;
            this.vy += Math.cos(Date.now() * 0.001 + this.y * 0.01) * 0.02;
            
            // Limitar velocidade
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 3) {
                this.vx = (this.vx / speed) * 3;
                this.vy = (this.vy / speed) * 3;
            }
            
            // Wrap around suave
            if (this.x < -50) this.x = canvas.width + 50;
            if (this.x > canvas.width + 50) this.x = -50;
            if (this.y < -50) this.y = canvas.height + 50;
            if (this.y > canvas.height + 50) this.y = -50;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 191, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Conectar partículas próximas (otimizado)
    function connectParticles() {
        const maxConnections = 3; // Limitar conexões por partícula
        
        for (let i = 0; i < particles.length; i++) {
            let connections = 0;
            
            for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                
                // Otimização: verificar distância quadrada primeiro
                const distSq = dx * dx + dy * dy;
                const maxDistSq = 150 * 150;
                
                if (distSq < maxDistSq) {
                    const distance = Math.sqrt(distSq);
                    const opacity = 0.3 * (1 - distance / 150);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 191, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    
                    connections++;
                }
            }
        }
    }
    
    // Animation loop (otimizado)
    let lastTime = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;
    
    function animate(currentTime) {
        requestAnimationFrame(animate);
        
        const deltaTime = currentTime - lastTime;
        if (deltaTime < frameTime) return;
        
        lastTime = currentTime - (deltaTime % frameTime);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Batch drawing
        ctx.shadowBlur = 0; // Desabilitar shadow para melhor performance
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();

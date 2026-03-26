// Sistema de Autenticação NextHire
// Usando localStorage para simular um backend

// Registrar novo usuário
function register(name, email, password) {
    // Verificar se já existe um usuário com este email
    const users = JSON.parse(localStorage.getItem('procv-users') || '[]');
    
    if (users.find(u => u.email === email)) {
        return {
            success: false,
            message: 'Este email já está cadastrado!'
        };
    }
    
    // Criar novo usuário
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: btoa(password), // Codificação simples (em produção use hash real)
        createdAt: new Date().toISOString(),
        cvs: []
    };
    
    users.push(newUser);
    localStorage.setItem('procv-users', JSON.stringify(users));
    
    // Fazer login automático
    const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };
    localStorage.setItem('procv-current-user', JSON.stringify(userSession));
    
    return {
        success: true,
        user: userSession
    };
}

// Fazer login
function login(email, password) {
    const users = JSON.parse(localStorage.getItem('procv-users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return {
            success: false,
            message: 'Email não encontrado!'
        };
    }
    
    if (user.password !== btoa(password)) {
        return {
            success: false,
            message: 'Senha incorreta!'
        };
    }
    
    // Criar sessão
    const userSession = {
        id: user.id,
        name: user.name,
        email: user.email
    };
    localStorage.setItem('procv-current-user', JSON.stringify(userSession));
    
    return {
        success: true,
        user: userSession
    };
}

// Fazer logout
function logout() {
    localStorage.removeItem('procv-current-user');
    window.location.href = 'index.html';
}

// Obter usuário atual
function getCurrentUser() {
    const userSession = localStorage.getItem('procv-current-user');
    return userSession ? JSON.parse(userSession) : null;
}

// Verificar se está autenticado
function isAuthenticated() {
    return getCurrentUser() !== null;
}

// Salvar CV do usuário
function saveUserCV(cvData) {
    const user = getCurrentUser();
    if (!user) {
        return {
            success: false,
            message: 'Você precisa estar logado para salvar!'
        };
    }
    
    const users = JSON.parse(localStorage.getItem('procv-users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex === -1) {
        return {
            success: false,
            message: 'Usuário não encontrado!'
        };
    }
    
    // Adicionar ou atualizar CV
    const cvId = cvData.id || Date.now().toString();
    const cv = {
        id: cvId,
        data: cvData,
        updatedAt: new Date().toISOString()
    };
    
    if (!users[userIndex].cvs) {
        users[userIndex].cvs = [];
    }
    
    const cvIndex = users[userIndex].cvs.findIndex(c => c.id === cvId);
    if (cvIndex !== -1) {
        users[userIndex].cvs[cvIndex] = cv;
    } else {
        users[userIndex].cvs.push(cv);
    }
    
    localStorage.setItem('procv-users', JSON.stringify(users));
    
    return {
        success: true,
        cvId: cvId
    };
}

// Obter CVs do usuário
function getUserCVs() {
    const user = getCurrentUser();
    if (!user) return [];
    
    const users = JSON.parse(localStorage.getItem('procv-users') || '[]');
    const userData = users.find(u => u.id === user.id);
    
    return userData?.cvs || [];
}

// Deletar CV
function deleteUserCV(cvId) {
    const user = getCurrentUser();
    if (!user) {
        return {
            success: false,
            message: 'Você precisa estar logado!'
        };
    }
    
    const users = JSON.parse(localStorage.getItem('procv-users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex === -1) {
        return {
            success: false,
            message: 'Usuário não encontrado!'
        };
    }
    
    users[userIndex].cvs = users[userIndex].cvs.filter(cv => cv.id !== cvId);
    localStorage.setItem('procv-users', JSON.stringify(users));
    
    return {
        success: true
    };
}

// Proteger página (redirecionar se não estiver logado)
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

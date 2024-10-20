// Mock list of achievements for different games
// Mock list of achievements for different games
const achievements = [
    {
        id: 1,
        game: 'Game A',
        title: 'First Blood',
        description: 'Defeat your first enemy.',
        points: 10,
        unlocked: false,
        backgroundImage: 'url("first blood.jpg")' // Add the image path here
    },
    {
        id: 2,
        game: 'Game B',
        title: 'Explorer',
        description: 'Discover a hidden area.',
        points: 20,
        unlocked: false,
        backgroundImage: 'url("explorer.jpg")'
    },
    {
        id: 3,
        game: 'Game A',
        title: 'Boss Slayer',
        description: 'Defeat the first boss.',
        points: 30,
        unlocked: false,
        backgroundImage: 'url("boss.jpg")'
    },
    {
        id: 4,
        game: 'Game C',
        title: 'Speedster',
        description: 'Complete the level in under 2 minutes.',
        points: 15,
        unlocked: false,
        backgroundImage: 'url("speedster.jpg")'
    }
];


// Mock list of assets (e.g., NFTs, tokens) used across games
// Mock list of assets (e.g., NFTs, tokens) used across games
const assets = [
    {
        id: 1,
        name: 'Legendary Sword NFT',
        gamesUsed: ['Game A', 'Game C'],
        usageCount: 5,
        backgroundImage: 'url("sword.jpeg")' // Add the image path here
        
    },
    {
        id: 2,
        name: 'Rare Shield Token',
        gamesUsed: ['Game B'],
        usageCount: 3,
        backgroundImage: 'url("shield.jpg")' 
    },
    {
        id: 3,
        name: 'Speed Boost NFT',
        gamesUsed: ['Game A', 'Game B', 'Game C'],
        usageCount: 8,
        backgroundImage: 'url("thunder.webp")' 
    }
];
window.addEventListener('load', function() {
    var audio = document.getElementById('backgroundMusic');
    
    // Check if audio can play, and if not, handle autoplay restrictions
    audio.play().catch(function(error) {
        console.log('Autoplay prevented: ', error);
    });
});


// Player Data
const player = {
    name: 'Player1',
    totalPoints: 0,
    achievementsUnlocked: [],
    assetUsage: assets // Track asset usage here
};

// Save and Load data from localStorage
function savePlayerData() {
    localStorage.setItem('playerData', JSON.stringify(player));
}

function loadPlayerData() {
    const savedData = localStorage.getItem('playerData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        player.name = parsedData.name;
        player.totalPoints = parsedData.totalPoints;
        player.achievementsUnlocked = parsedData.achievementsUnlocked;
        player.assetUsage = parsedData.assetUsage;
    }
}

// Unlock achievement function
// Function to unlock an achievement and play a sound
function unlockAchievement(id) {
    const achievement = achievements.find(a => a.id === id);

    if (!achievement.unlocked) {
        achievement.unlocked = true;
        player.totalPoints += achievement.points;
        
        // Play the unlock sound
        const unlockSound = document.getElementById('unlockSound');
        unlockSound.play();
        
        // Re-render the achievements
        renderAchievements();
    }
}


// Render the achievements to the UI
// Render the achievements to the UI
function renderAchievements() {
    const achievementList = document.getElementById('achievementList');
    const totalPointsEl = document.getElementById('totalPoints');
    totalPointsEl.textContent = player.totalPoints;

    achievementList.innerHTML = '';
    achievements.forEach(achievement => {
        const achievementDiv = document.createElement('div');
        achievementDiv.classList.add('card');
        
        // Check if the achievement has a background image
        if (achievement.backgroundImage) {
            achievementDiv.style.backgroundImage = achievement.backgroundImage;
            achievementDiv.classList.add('with-background');
        }

        if (!achievement.unlocked) {
            achievementDiv.classList.add('locked');
        }

        achievementDiv.innerHTML = `
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
            <p>Game: ${achievement.game}</p>
            <p>Points: ${achievement.points}</p>
            <button onclick="unlockAchievement(${achievement.id})" ${achievement.unlocked ? 'disabled' : ''}>
                ${achievement.unlocked ? 'Unlocked' : 'Unlock'}
            </button>
        `;

        achievementList.appendChild(achievementDiv);
    });
}


// Render asset usage tracking
// Render asset usage tracking
// Render asset usage tracking
function renderAssets() {
    const assetList = document.getElementById('assetList');
    assetList.innerHTML = '';

    player.assetUsage.forEach(asset => {
        const assetDiv = document.createElement('div');
        assetDiv.classList.add('card');
        
        // If asset has a background image, add it to the style
        if (asset.backgroundImage) {
            assetDiv.style.backgroundImage = asset.backgroundImage;
            assetDiv.classList.add('with-background'); // Add a class for cards with background images
        }

        assetDiv.innerHTML = `
            <h3>${asset.name}</h3>
            <p>Games Used: ${asset.gamesUsed.join(', ')}</p>
            <p>Usage Count: ${asset.usageCount}</p>
        `;

        assetList.appendChild(assetDiv);
    });
}



// Initialize the system
function init() {
    loadPlayerData();
    renderAchievements();
    renderAssets();
}

window.onload = init;
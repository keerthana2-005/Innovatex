// Random Tree Generator
function generateTree(depth = 3) {
    if (depth === 0) return null;
    return {
        value: Math.floor(Math.random() * 100),
        left: Math.random() > 0.5 ? generateTree(depth - 1) : null,
        right: Math.random() > 0.5 ? generateTree(depth - 1) : null,
    };
}

// Tree Traversal
function traverseTree(node, order, result = []) {
    if (!node) return result;
    if (order === 'preorder') result.push(node);
    traverseTree(node.left, order, result);
    if (order === 'inorder') result.push(node);
    traverseTree(node.right, order, result);
    if (order === 'postorder') result.push(node);
    return result;
}

// Visualization
function createTreeVisualization(node, x, y, level = 0) {
    if (!node) return;

    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'node';
    nodeDiv.textContent = node.value;
    nodeDiv.style.left = `${x}%`;
    nodeDiv.style.top = `${y}px`;
    treeContainer.appendChild(nodeDiv);
    node.domElement = nodeDiv;

    nodeDiv.addEventListener('click', () => handleNodeClick(node));

    if (node.left) createTreeVisualization(node.left, x - 15 / (level + 1), y + 70, level + 1);
    if (node.right) createTreeVisualization(node.right, x + 15 / (level + 1), y + 70, level + 1);
}

// Game State
let tree = generateTree(3);
let score = 0;
let level = 1;
let timer = 60;
let traversalNodes = [];
let currentIndex = 0;
let interval;

const treeContainer = document.getElementById('tree-visualization');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level');

// Gameplay
function startTraversal(order) {
    clearInterval(interval);
    currentIndex = 0;
    traversalNodes = traverseTree(tree, order);
    traversalNodes.forEach(node => node.domElement.classList.remove('active', 'hint'));

    timer = 60 - level * 5;
    timerDisplay.textContent = `Time Left: ${timer}s`;

    interval = setInterval(() => {
        timer--;
        timerDisplay.textContent = `Time Left: ${timer}s`;
        if (timer <= 0) {
            clearInterval(interval);
            alert('Time is up! Game Over!');
            resetGame();
        }
    }, 1000);
}

function handleNodeClick(node) {
    if (node === traversalNodes[currentIndex]) {
        node.domElement.classList.add('active');
        currentIndex++;
        if (currentIndex === traversalNodes.length) {
            clearInterval(interval);
            score += level * 10;
            scoreDisplay.textContent = `Score: ${score}`;
            level++;
            levelDisplay.textContent = `Level: ${level}`;
            alert('Traversal complete! Moving to the next level.');
            resetGame();
        }
    } else {
        alert('Wrong node! Points deducted.');
        score = Math.max(0, score - 5);
        scoreDisplay.textContent = `Score: ${score}`;
        currentIndex = 0;
        traversalNodes.forEach(node => node.domElement.classList.remove('active'));
    }
}

function showHint() {
    if (currentIndex < traversalNodes.length) {
        traversalNodes[currentIndex].domElement.classList.add('hint');
        score = Math.max(0, score - 2);
        scoreDisplay.textContent = `Score: ${score}`;
    }
}
// Updated createTreeVisualization function
// Tree Visualization
// Tree Visualization
// Updated createTreeVisualization function
// Updated createTreeVisualization function with adjusted gap
// Updated createTreeVisualization function with adjusted gap for child nodes
function createTreeVisualization(node, x, y, level = 0, parent = null) {
    if (!node) return;

    // Create the node div
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'node';
    nodeDiv.textContent = node.value;
    nodeDiv.style.left = `${x}%`;
    nodeDiv.style.top = `${y}px`;
    treeContainer.appendChild(nodeDiv);
    node.domElement = nodeDiv;

    // Add a straight line connecting this node to its parent
    if (parent) {
        const line = document.createElement('div');
        line.className = 'line';
        const parentRect = parent.domElement.getBoundingClientRect();
        const childRect = nodeDiv.getBoundingClientRect();

        // Calculate the positions relative to the tree container
        const startX = parentRect.left + parentRect.width / 2 - treeContainer.getBoundingClientRect().left;
        const startY = parentRect.top + parentRect.height - treeContainer.getBoundingClientRect().top;
        const endX = childRect.left + childRect.width / 2 - treeContainer.getBoundingClientRect().left;
        
        // Reduce the gap between the line and the child node (10 in this case)
        const endY = childRect.top - treeContainer.getBoundingClientRect().top + 5;  // Adjusting for the line to be closer to the child node

        // Draw a straight line (no rotation)
        line.style.width = `${Math.abs(startX - endX)}px`;
        line.style.height = `${Math.abs(startY - endY)}px`;
        line.style.backgroundColor = '#007acc'; // Line color
        line.style.position = 'absolute';
        line.style.left = `${Math.min(startX, endX)}px`;
        line.style.top = `${Math.min(startY, endY)}px`;

        treeContainer.appendChild(line);
    }

    nodeDiv.addEventListener('click', () => handleNodeClick(node));

    if (node.left) createTreeVisualization(node.left, x - 15 / (level + 1), y + 70, level + 1, node);
    if (node.right) createTreeVisualization(node.right, x + 15 / (level + 1), y + 70, level + 1, node);
}


// Function to start the visualization
function initializeTreeVisualization(root) {
    treeContainer.innerHTML = '';  // Clear previous visualization
    createTreeVisualization(root, 50, 20);  // Start the tree at the center
}


// Reset Game
function resetGame() {
    treeContainer.innerHTML = '';
    tree = generateTree(level + 2);
    createTreeVisualization(tree, 50, 20);
}

// Initial Setup
resetGame();

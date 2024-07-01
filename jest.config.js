module.exports = {
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
	transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
};
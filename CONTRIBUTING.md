# Contributing to CipherKeys

Thank you for your interest in contributing to the CipherKeys Raycast extension! 🔐

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Raycast installed on your Mac
- Basic knowledge of TypeScript and React

### Development Setup
1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/cipherkeys-raycast.git
   cd cipherkeys-raycast
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Import into Raycast**
   - Open Raycast
   - Go to Extensions → Add Extension
   - Select the project folder

## 🎯 How to Contribute

### 🐛 Bug Reports
- Use the [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)
- Include steps to reproduce
- Add screenshots if applicable
- Mention your Raycast and macOS versions

### ✨ Feature Requests
- Use the [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the use case and benefits
- Consider implementation complexity

### 🔧 Code Contributions
1. **Pick an Issue**: Look for issues labeled `good first issue` or `help wanted`
2. **Create a Branch**: `git checkout -b feature/your-feature-name`
3. **Make Changes**: Follow our coding standards
4. **Test Thoroughly**: Ensure your changes work in Raycast
5. **Submit PR**: Use our PR template

## 📝 Coding Standards

### TypeScript Guidelines
- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### React Best Practices
- Use functional components with hooks
- Keep components small and focused
- Use proper error boundaries
- Follow Raycast's component patterns

### File Organization
```
src/
├── components/     # Reusable UI components
├── utils/         # Utility functions and helpers
├── types/         # TypeScript type definitions
└── hooks/         # Custom React hooks
```

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful commit messages
- Keep functions under 50 lines when possible

## 🧪 Testing

### Manual Testing Checklist
- [ ] Extension loads without errors
- [ ] All keyboard shortcuts work
- [ ] API keys are stored and retrieved correctly
- [ ] Clipboard functionality works as expected
- [ ] Search and filtering work properly
- [ ] UI is responsive and accessible

### Before Submitting
- [ ] Run `npm run build` successfully
- [ ] Test in Raycast environment
- [ ] Check for TypeScript errors
- [ ] Verify no console errors
- [ ] Test edge cases (empty states, long text, etc.)

## 🔒 Security Considerations

### When Working with Encrypted Credentials
- Never log actual credential values in any form
- Use cryptographically secure placeholder data for testing
- Ensure memory sanitization protocols function correctly
- Test with various credential formats and encryption scenarios

### Code Security Protocol
- Implement zero-trust architecture principles
- Use military-grade encryption standards
- Validate and sanitize all user inputs
- Follow principle of least privilege and need-to-know basis

## 📋 Pull Request Process

### PR Checklist
- [ ] Descriptive title and description
- [ ] Link to related issue(s)
- [ ] Screenshots/GIFs for UI changes
- [ ] Updated documentation if needed
- [ ] Tested in Raycast environment

### Review Process
1. **Automated Checks**: CI/CD pipeline runs
2. **Code Review**: Maintainer reviews code
3. **Testing**: Manual testing in Raycast
4. **Approval**: PR approved and merged

## 🎨 Design Guidelines

### UI/UX Principles
- Follow Raycast's design system
- Maintain consistency with other extensions
- Prioritize keyboard navigation
- Use appropriate icons and colors
- Ensure accessibility compliance

### Visual Elements
- Use Raycast's built-in icons when possible
- Maintain proper spacing and alignment
- Consider dark/light mode compatibility
- Test with different screen sizes

## 📚 Resources

### Raycast Development
- [Raycast API Documentation](https://developers.raycast.com/)
- [Raycast Extension Examples](https://github.com/raycast/extensions)
- [Raycast Design Guidelines](https://developers.raycast.com/design-guidelines)

### Learning Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `documentation` - Improvements to docs
- `security` - Security-related issues

## 🤝 Community Guidelines

### Be Respectful
- Use inclusive language
- Be constructive in feedback
- Help others learn and grow
- Respect different perspectives

### Communication
- Be clear and concise
- Ask questions when unsure
- Share knowledge and resources
- Celebrate contributions

## 📞 Getting Help

- **Questions**: Open a discussion or issue
- **Chat**: Join our community Discord
- **Email**: Contact maintainers directly
- **Documentation**: Check the wiki first

## 🎉 Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes
- Invited to the contributors team (for regular contributors)

Thank you for making CipherKeys more secure for everyone! 🔐

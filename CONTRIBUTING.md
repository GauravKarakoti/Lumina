# Contributing to Lumina

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to Lumina. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## ⚡ How Can I Contribute?

### Reporting Bugs
This section guides you through submitting a bug report.
- **Use a clear and descriptive title.**
- **Describe the exact steps to reproduce the problem.**
- **Provide specific examples to demonstrate the steps.**
- **Describe the behavior you observed after following the steps.**

### Suggesting Enhancements
- **Use a clear and descriptive title.**
- **Provide a step-by-step description of the suggested enhancement.**
- **Explain why this enhancement would be useful.**

### Pull Requests
1. **Fork the repo** and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code lints.
5. Issue that pull request!

## 💻 Development Workflow

1.  **Clone your fork:**
    ```bash
    git clone [https://github.com/GauravKarakoti/lumina.git](https://github.com/GauravKarakoti/lumina.git)
    ```

2.  **Create a branch:**
    ```bash
    git checkout -b feature/amazing-feature
    ```

3.  **Make your changes:**
    - Ensure you are following the project's coding style (Prettier/ESLint).
    - If modifying the database, ensure you create a migration:
      ```bash
      cd server
      npx prisma migrate dev --name describe_your_change
      ```

4.  **Commit your changes:**
    ```bash
    git commit -m "feat: Add some amazing feature"
    ```

5.  **Push to the branch:**
    ```bash
    git push origin feature/amazing-feature
    ```

6.  **Open a Pull Request.**

## 🎨 Style Guide

### React/Frontend
- We use **Functional Components** with Hooks.
- We use **TypeScript** for type safety. Please avoid `any` wherever possible.
- Use **Tailwind CSS** for styling.
- Components should be modular and reusable.

### Node/Backend
- Follow **RESTful** API design principles.
- Use **Async/Await** for asynchronous operations.
- Ensure all environment variables are typed or checked.

## 🧪 Testing
Currently, we manually test features. If adding a complex feature, please provide a description of how to test it in your Pull Request.
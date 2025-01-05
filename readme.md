# **Custom Elements - My Design**  

**Custom Elements** is an open-source library that provides lightweight, reusable, and modular UI components built with Shadow DOM for encapsulation. With **My Design (md)**, you can effortlessly create stunning and modern web applications.  

---

## 🛠️ **Features**  

- **Comprehensive Component Library**: Includes various components like `container`, `box`, `button`, `modal`, `popover`, `icon-button`, and more.  
- **Shadow DOM Support**: Each component is self-contained with scoped styles and logic.  
- **Customizable**: Easily modify styles and extend components to suit your needs.  
- **Responsive**: Built to work seamlessly on all screen sizes.  
- **Lightweight**: No external dependencies, just pure web components.  

---

## 📦 **Components Overview**  

Here’s a detailed list of components available in the **Custom Elements** library:  

1. **`<md-container>`**  
   A layout wrapper to structure your content in a responsive manner.  
   - **Use Case**: To group and align UI elements neatly.

   ```html
   <md-container>
     <md-typography variant="h1">Welcome to My Design</md-typography>
   </md-container>
   ```

2. **`<md-box>`**  
   A flexible container for creating boxed layouts.  
   - **Use Case**: To wrap buttons, icons, or other UI elements.  

   ```html
   <md-box>
     <md-button>Click Me</md-button>
   </md-box>
   ```

3. **`<md-button>`**  
   Buttons with different variants like `outlined` and `contained`.  
   - **Use Case**: For actions like opening modals or triggering events.  

   ```html
   <md-button variant="contained">Submit</md-button>
   ```

4. **`<md-icon-button>`**  
   Compact buttons with icons for lightweight actions.  
   - **Use Case**: Toolbars, navigation, and quick actions.  

   ```html
   <md-icon-button target="#my-popover">
     <md-icon>menu</md-icon>
   </md-icon-button>
   ```

5. **`<md-modal>`**  
   A modal/dialog box for displaying additional content or actions.  
   - **Use Case**: Pop-ups, forms, or important alerts.  

   ```html
   <md-modal id="my-modal">
     <md-typography variant="h2">Modal Title</md-typography>
     <md-typography>This is a modal body.</md-typography>
   </md-modal>
   ```

6. **`<md-popover>`**  
   A contextual popover for showing additional information.  
   - **Use Case**: Tooltips or small UI overlays.  

   ```html
   <md-popover id="my-popover">
     <md-typography>This is a popover content.</md-typography>
   </md-popover>
   ```

7. **`<md-divider>`**  
   A horizontal line to separate content sections.  
   - **Use Case**: To improve content readability.  

   ```html
   <md-divider></md-divider>
   ```

8. **`<md-icon>`**  
   A customizable icon component.  
   - **Use Case**: To display icons anywhere in the UI.  

   ```html
   <md-icon>home</md-icon>
   ```

9. **`<md-typography>`**  
   A typography component for styled text.  
   - **Use Case**: Headers, paragraphs, or any text content.  

   ```html
   <md-typography variant="h1">Hello World</md-typography>
   ```

10. **`<md-skeleton>`**  
    A skeleton loader for improving perceived loading performance.  
    - **Use Case**: Placeholders during data fetching.  

    ```html
    <md-skeleton></md-skeleton>
    ```

11. **`<md-textfield>`**  
    A styled text field for inputting data.  
    - **Use Case**: Forms or search bars.  

    ```html
    <md-textfield placeholder="Enter your name"></md-textfield>
    ```

---

## 📄 **Usage**  

Here’s how to use **My Design** in your project:  

1. Clone the repository:  
   ```bash
   git clone https://github.com/Sanmeet007/custom-elements.git
   cd custom-elements
   ```

2. Include the Material Icons library and the custom elements script in your project, add the following code to the `<head>` and `<body>` sections of your HTML:
   ```html
   <!-- Add this in the <head> section to import Material Icons -->
   <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">

   <!-- Add this before the closing </body> tag to include the custom elements script -->
   <script src="custom-elements.js"></script>
   ```

3. Start using components in your HTML:  

   ```html
   <md-container>
     <md-typography variant="h1">My Design</md-typography>
     <md-box>
       <md-button variant="contained">Click me</md-button>
     </md-box>
   </md-container>
   ```

---

## 🎨 **Styling**  

Customize components by overriding CSS variables:  

Example: Change the primary color of buttons:  
```css
:root {
  --md-button-primary-color: #ff5722;
}
```  

---

## 🤝 **Contributing**  

We welcome contributions! Feel free to:  
- Fork the repository.  
- Create new components or enhance existing ones.  
- Submit a pull request or file an issue.  

---

### 🌌 **Discover the simplicity of reusable web components with Custom Elements!**

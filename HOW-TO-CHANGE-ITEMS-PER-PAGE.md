# How to Change Items Per Page

## ✅ SIMPLE ONE-LINE CHANGE

To change the number of items displayed per page from 9 to 6 (or any other number), you only need to edit **ONE LINE** in **ONE FILE**:

### File to Edit: `js/pagination.js`

**Line to Change (Line 6):**
```javascript
itemsPerPage: 9  // Change this number to 6 (or any other value) to update globally
```

**Change it to:**
```javascript
itemsPerPage: 6  // Change this number to 6 (or any other value) to update globally
```

## Complete Line in Context:

```javascript
// Global Configuration - Change this value to update items per page across the entire site
const PAGINATION_CONFIG = {
    itemsPerPage: 6  // ← Change ONLY this number
};
```

## 🎯 That's It!

This single change will automatically update:
- ✅ Homepage "My Works" section
- ✅ Homepage "My Blogs" section  
- ✅ Blog page
- ✅ 3D Assets page
- ✅ All future sections that use pagination

## 📋 Example Values:
- `6` = 6 items per page (2x3 grid)
- `8` = 8 items per page (perfect for some layouts)
- `12` = 12 items per page (3x4 grid)
- `15` = 15 items per page (3x5 grid)

## 💡 Why This Works:
The system now uses a centralized configuration that all pagination instances reference. No need to edit multiple files anymore!

---
**Note**: You'll see the changes immediately when you refresh your website.
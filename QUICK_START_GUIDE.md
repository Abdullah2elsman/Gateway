# 🚀 Quick Start Guide - Profile Image Fix

## Step-by-Step Instructions

### 1️⃣ **Check Current State**

```bash
cd Backend
php test_image_storage.php
```

This will show you:

- How many images are in storage
- How many database records exist
- Which records need migration
- Any missing files

---

### 2️⃣ **Run Migration (If Needed)**

```bash
cd Backend
php fix_user_image_paths.php
```

This will:

- Update all old format paths (`/user/image.jpg` → `image.jpg`)
- Verify files exist before updating
- Show progress for each record

---

### 3️⃣ **Test in Postman**

#### **Import Collection:**

1. Open Postman
2. Click "Import"
3. Select `Profile_Image_API_Tests.postman_collection.json`

#### **Configure Variables:**

1. Click on the collection
2. Go to "Variables" tab
3. Update:
   - `base_url`: `http://localhost:8000` (or your server URL)
   - `token`: Your auth token (or run "1. Login" first)

#### **Run Tests:**

1. **Login** → Get auth token
2. **Get Current User Profile** → See your data
3. **Upload Profile Image** → Upload a new image
4. **Get Profile Image Info** → Verify it was saved
5. **Get Profile Image File** → View the actual image
6. **Public Image Access** → Test public route

---

### 4️⃣ **Test in Frontend**

#### **Update .env (if needed):**

```env
# Frontend/.env
VITE_API_URL_image=http://localhost:8000
```

#### **Test Upload:**

1. Go to Profile page
2. Click on profile image
3. Select a new image
4. Click Save
5. Verify image appears immediately

#### **Check Browser Console:**

```javascript
// Should see logs like:
Profile data updated: {...}
User image path: 1234567890_123456_image.jpg
Image URL: http://localhost:8000/user/1234567890_123456_image.jpg
```

---

## 🎯 Expected Results

### **Database (gt_usermeta):**

```sql
| user_id | meta_key   | meta_value                    |
|---------|------------|-------------------------------|
| 123     | user_image | 1234567890_123456_image.jpg   |  ✅ Correct
```

### **Storage:**

```
Backend/storage/app/user/
├── 1234567890_123456_image.jpg
├── 1234567890_789012_photo.png
└── ...
```

### **API Response:**

```json
{
  "success": true,
  "data": {
    "user_id": 123,
    "user_name": "John Doe",
    "image_path": "1234567890_123456_image.jpg",
    "image_url": "http://localhost:8000/user/1234567890_123456_image.jpg",
    "file_exists": true,
    "file_size": 45678
  }
}
```

### **Frontend:**

```
Image displays at: http://localhost:8000/user/1234567890_123456_image.jpg
```

---

## ⚠️ Common Issues

### **Issue: "Image not found" (404)**

**Check:**

```bash
# 1. File exists?
ls -la Backend/storage/app/user/

# 2. Database value correct?
php Backend/test_image_storage.php

# 3. Permissions OK?
chmod -R 775 Backend/storage
```

**Fix:**

```bash
# Re-run migration
cd Backend
php fix_user_image_paths.php
```

---

### **Issue: "Permission denied"**

**Fix:**

```bash
# Linux/Mac
sudo chown -R www-data:www-data Backend/storage
sudo chmod -R 775 Backend/storage

# Or for development
chmod -R 777 Backend/storage
```

---

### **Issue: "Old path format still in DB"**

**Check:**

```bash
php Backend/test_image_storage.php
```

**Fix:**

```bash
php Backend/fix_user_image_paths.php
```

---

### **Issue: "Frontend shows broken image"**

**Check:**

1. Browser console for errors
2. Network tab for 404 responses
3. Environment variable `VITE_API_URL_image`

**Fix:**

```bash
# Frontend/.env
VITE_API_URL_image=http://localhost:8000

# Restart frontend
npm run dev
```

---

## 📝 API Endpoints Reference

### **Get Profile Image Info**

```
GET /api/v1/user/profile-image
GET /api/v1/user/profile-image/{user_id}

Headers:
  Authorization: Bearer {token}

Response:
  {
    "success": true,
    "data": {
      "user_id": 123,
      "user_name": "John Doe",
      "image_path": "image.jpg",
      "image_url": "http://localhost:8000/user/image.jpg",
      "file_exists": true,
      "file_size": 45678
    }
  }
```

### **Get Profile Image File**

```
GET /api/v1/user/profile-image-file
GET /api/v1/user/profile-image-file/{user_id}

Headers:
  Authorization: Bearer {token}

Response:
  [Image file binary data]
```

### **Public Image Access**

```
GET /user/{filename}

No authentication required

Response:
  [Image file binary data]
```

---

## ✅ Verification Checklist

- [ ] Run `test_image_storage.php` - No issues found
- [ ] Run `fix_user_image_paths.php` - All records updated
- [ ] Upload new image via Postman - Success (201)
- [ ] Get image info via API - Returns correct data
- [ ] Get image file via API - Returns actual image
- [ ] Access image via public URL - Image displays
- [ ] Upload image via Frontend - Image appears
- [ ] Refresh page - Image still displays
- [ ] Check browser console - No 404 errors
- [ ] Check Laravel logs - No errors

---

## 🎉 Success Indicators

✅ **Database**: All `user_image` values are filenames only (no paths)  
✅ **Storage**: Files exist in `storage/app/user/`  
✅ **API**: Returns correct image URLs  
✅ **Frontend**: Images display without 404 errors  
✅ **Logs**: No errors in Laravel or browser console

---

## 📞 Need Help?

1. **Check logs:**

   ```bash
   tail -f Backend/storage/logs/laravel.log
   ```

2. **Run diagnostics:**

   ```bash
   php Backend/test_image_storage.php
   ```

3. **Test API:**

   - Import Postman collection
   - Run all tests
   - Check responses

4. **Review documentation:**
   - `IMAGE_STORAGE_FIX.md` - Detailed explanation
   - `QUICK_START_GUIDE.md` - This file

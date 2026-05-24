# Hướng Dẫn Cập Nhật Tính Năng Ghim Dự Án (Pinned Project) - Tháng 5/2026

Tài liệu này hướng dẫn chi tiết các thay đổi đã được thực hiện để tích hợp tính năng ghim dự án lên đầu danh sách cho cả Client (Portfolio) và Admin.

---

## 1. Cập nhật Types (`types/project.ts`)

Thêm trường `isPinned?: boolean` vào định nghĩa kiểu dữ liệu của `Project` (dùng cho danh sách) và `ProjectHead` (dùng cho chi tiết).

### Chi tiết thay đổi:

```typescript
export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    category: "uiux" | "graphic" | "art";
    isPinned?: boolean; // <-- THÊM MỚI
}

export interface ProjectHead {
    title: string;
    description: string;
    thumbnail: string;
    category: "uiux" | "graphic" | "art";
    projectLink?: string;
    isPinned?: boolean; // <-- THÊM MỚI
}
```

---

## 2. Cập nhật Service (`services/projectService.ts`)

Cần cập nhật hàm lấy danh sách dự án `getProjectsByCategory` để:

1. Ánh xạ thuộc tính `isPinned` từ Firestore.
2. Sắp xếp đưa các dự án đã ghim (`isPinned === true`) lên đầu danh sách.

### Chi tiết thay đổi:

```typescript
const projects: Project[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as ProjectData;
    return {
        id: doc.id,
        title: data.head.title,
        description: data.head.description,
        image: data.head.thumbnail,
        category: data.head.category,
        isPinned: data.head.isPinned || false, // <-- THÊM MỚI
    };
});

// Sắp xếp đưa các dự án được ghim lên đầu danh sách <-- THÊM MỚI
projects.sort((a, b) => {
    const aPinned = a.isPinned ? 1 : 0;
    const bPinned = b.isPinned ? 1 : 0;
    return bPinned - aPinned;
});
```

---

## 3. Cập nhật trang danh sách dự án ở Client (`pages/Projects/index.tsx`)

Sử dụng `useMemo` để lọc và đảm bảo danh sách hiển thị theo category ở Client luôn được sắp xếp đưa dự án đã ghim lên đầu.

### Chi tiết thay đổi:

```typescript
const filteredProjects = useMemo(() => {
    const filtered = allProjects.filter((project) => project.category === activeCategory);
    return filtered.sort((a, b) => {
        const aPinned = a.isPinned ? 1 : 0;
        const bPinned = b.isPinned ? 1 : 0;
        return bPinned - aPinned;
    });
}, [allProjects, activeCategory]);
```

---

## 4. Cập nhật phần nổi bật ở Trang chủ (`pages/Home/Sections/ProjectsSection/index.tsx`)

Đảm bảo khi lấy 6 dự án tiêu biểu để show ngoài trang chủ, hệ thống sẽ ưu tiên các dự án được ghim trước.

### Chi tiết thay đổi:

```typescript
const featuredProjects = useMemo(() => {
    const sorted = [...uiuxProjects].sort((a, b) => {
        const aPinned = a.isPinned ? 1 : 0;
        const bPinned = b.isPinned ? 1 : 0;
        return bPinned - aPinned;
    });
    return sorted.slice(0, 6);
}, [uiuxProjects]);
```

---

## 5. Lưu ý hoạt động trên DB (Firestore)

- Các dự án cũ chưa cập nhật trên Admin sẽ mặc định có thuộc tính `isPinned` là `undefined` hoặc `false`.
- Khi vào trang Admin chỉnh sửa và bật nút **Switch "Ghim lên đầu danh sách"**, hệ thống sẽ lưu `isPinned: true` vào DB và tự động đưa dự án đó lên đầu tiên.

# Hướng Dẫn Cập Nhật Client (Portfolio) - Cập Nhật Tháng 5/2026

Tài liệu này hướng dẫn cách cập nhật giao diện hiển thị phía Client (Portfolio website) để đồng bộ với những thay đổi mới nhất từ hệ thống Admin.

---

## 1. Cập nhật Types (TypeScript)

Trong file định nghĩa kiểu dữ liệu dự án ở Client (ví dụ: `types/project.ts`), bạn hãy cập nhật lại cấu trúc `ProjectSection` và `ParagraphItem` như sau:

```typescript
// Định nghĩa cấu trúc từng dòng văn bản trong Text block
export interface ParagraphItem {
    type: "paragraph" | "list" | "subtitle"; // Thêm type "subtitle" cho tiêu đề nhỏ
    content: string;
}

// Định nghĩa cấu trúc của một Section
export interface ProjectSection {
    title?: string;
    isSubSection?: boolean; // Thêm trường đánh dấu là Section con (tùy chọn)
    type: "text" | "image" | "gallery" | "text-image";
    textStyle?: "paragraph" | "list" | "mixed";
    paragraphs?: ParagraphItem[];
    // Các trường khác giữ nguyên...
    text?: string;
    image?: string;
    imageAlt?: string;
    images?: Array<{ url: string; alt?: string }>;
}
```

---

## 2. Hướng dẫn hiển thị Phân Cấp Section (`isSubSection`)

Trường `isSubSection: true` dùng để nhóm một section làm con của section chính liền trước nó. Ở Client, bạn cần điều chỉnh mã render danh sách sections để thụt lề và giảm cỡ chữ của section con.

### Mã React JSX minh họa:

```tsx
import React from "react";
import type { ProjectSection } from "./types/project";

interface ProjectContentProps {
    sections: ProjectSection[];
}

export const ProjectContent: React.FC<ProjectContentProps> = ({ sections }) => {
    return (
        <div className="project-sections-container space-y-8">
            {sections.map((section, index) => {
                const isSub = !!section.isSubSection;

                return (
                    <div
                        key={index}
                        // Thụt lề và thêm đường kẻ biên trái nếu là section con để tạo phân cấp trực quan
                        className={`transition-all duration-300 ${
                            isSub ? "pl-6 md:pl-10 ml-2 md:ml-4 border-l-2 border-blue-400 mt-4" : "mt-10"
                        }`}
                    >
                        {/* Tiêu đề Section */}
                        {section.title && (
                            <h2
                                className={`font-bold tracking-tight text-gray-900 ${
                                    isSub
                                        ? "text-xl md:text-2xl mb-3 text-gray-700" // Cỡ chữ nhỏ hơn cho section con
                                        : "text-3xl md:text-4xl mb-6" // Cỡ chữ lớn cho section chính
                                }`}
                            >
                                {section.title}
                            </h2>
                        )}

                        {/* Render nội dung chi tiết theo loại Section (Text, Image, Gallery, v.v.) */}
                        <div className="section-body">{/* Logic render content của bạn... */}</div>
                    </div>
                );
            })}
        </div>
    );
};
```

---

## 3. Hướng dẫn hiển thị Tiêu Đề Nhỏ (`subtitle`) trong Khối Văn Bản

Khi section có `type` là `"text"` hoặc `"text-image"` và sử dụng kiểu hiển thị `paragraphs` (danh sách văn bản có định dạng), chúng ta đã thêm tuỳ chọn `type: "subtitle"`. Bạn cần render phần tử này thành thẻ heading nhỏ (ví dụ `<h3>`).

### Mã React JSX minh họa:

```tsx
import React from "react";
import type { ParagraphItem } from "./types/project";

interface TextBlockProps {
    paragraphs: ParagraphItem[];
}

export const TextBlock: React.FC<TextBlockProps> = ({ paragraphs }) => {
    return (
        <div className="prose prose-blue max-w-none space-y-3">
            {paragraphs.map((p, idx) => {
                switch (p.type) {
                    case "subtitle":
                        // Render tiêu đề nhỏ trong nội dung
                        return (
                            <h3 key={idx} className="text-lg md:text-xl font-semibold text-gray-800 pt-3 pb-1">
                                {p.content}
                            </h3>
                        );
                    case "list":
                        // Render danh sách dấu đầu dòng (Bullet)
                        return (
                            <li key={idx} className="list-disc list-inside text-gray-600 pl-4 leading-relaxed">
                                {p.content}
                            </li>
                        );
                    case "paragraph":
                    default:
                        // Render đoạn văn bản thông thường
                        return (
                            <p key={idx} className="text-gray-600 leading-relaxed text-base">
                                {p.content}
                            </p>
                        );
                }
            })}
        </div>
    );
};
```

---

## 4. Cấu hình Firestore trên Client (Khuyên dùng)

Để tránh lỗi khi tải hoặc cập nhật các thuộc tính rỗng (undefined) từ phía client, bạn nên đồng bộ thiết lập khởi tạo Firestore bằng cách sử dụng `ignoreUndefinedProperties: true`:

```typescript
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore loại bỏ các trường undefined khi làm việc với Database
export const db = initializeFirestore(app, {
    ignoreUndefinedProperties: true,
});
```

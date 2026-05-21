# Hướng dẫn tích hợp Cập nhật dữ liệu Project Sections (Frontend)

Màn hình Admin quản lý dự án đã được cập nhật để hỗ trợ nội dung dạng nhiều đoạn văn (Multi-paragraph), danh sách dấu chấm tròn (Bullet List) hoặc kết hợp cả hai (Mixed). Dưới đây là mô tả chi tiết về sự thay đổi cấu trúc dữ liệu và cách hiển thị tương ứng ở phía Frontend (Client).

---

## 1. Cấu trúc dữ liệu thay đổi

### 🔴 Cấu trúc cũ (Chỉ hỗ trợ 1 đoạn văn duy nhất)
Trước đây, dữ liệu section kiểu `text` hoặc `text-image` lưu văn bản dạng chuỗi (string) đơn giản:
```json
{
  "title": "Design Process",
  "type": "text",
  "text": "Đây là nội dung văn bản cũ chỉ có duy nhất một dòng hoặc một đoạn..."
}
```

### 🟢 Cấu trúc mới (Hỗ trợ nhiều đoạn, list, mixed)
Dữ liệu section kiểu `text` hoặc `text-image` hiện tại sử dụng trường `textStyle` và danh sách `paragraphs`:
```json
{
  "title": "Design Process",
  "type": "text",
  "textStyle": "paragraph" | "list" | "mixed",
  "paragraphs": [
    {
      "type": "paragraph" | "list", // Chỉ có giá trị khi textStyle là "mixed"
      "content": "Nội dung đoạn văn thứ nhất..."
    },
    {
      "type": "paragraph" | "list",
      "content": "Nội dung đoạn văn thứ hai..."
    }
  ]
}
```

---

## 2. Cách hiển thị ở phía Client (Frontend)

Khi duyệt qua các `sections` của dự án để render, bạn cần cập nhật logic xử lý phần hiển thị text như sau:

### Ví dụ code React (JSX/TSX):

```tsx
interface Paragraph {
  content: string;
  type?: "paragraph" | "list";
}

interface Section {
  title?: string;
  type: "text" | "image" | "gallery" | "text-image";
  textStyle?: "paragraph" | "list" | "mixed";
  paragraphs?: Paragraph[];
  image?: string;
  imageAlt?: string;
}

const RenderTextSection: React.FC<{ section: Section }> = ({ section }) => {
  const { textStyle = "paragraph", paragraphs = [] } = section;

  if (paragraphs.length === 0) return null;

  // 1. CHẾ ĐỘ PARAGRAPH: Hiển thị tất cả thành các thẻ p
  if (textStyle === "paragraph") {
    return (
      <div className="space-y-4">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="text-base text-gray-700 leading-relaxed">
            {p.content}
          </p>
        ))}
      </div>
    );
  }

  // 2. CHẾ ĐỘ BULLET LIST: Hiển thị tất cả thành danh sách ul > li
  if (textStyle === "list") {
    return (
      <ul className="list-disc pl-5 space-y-2">
        {paragraphs.map((p, idx) => (
          <li key={idx} className="text-base text-gray-700">
            {p.content}
          </li>
        ))}
      </ul>
    );
  }

  // 3. CHẾ ĐỘ MIXED: Trộn lẫn giữa đoạn văn thường và danh sách bullet
  if (textStyle === "mixed") {
    return (
      <div className="space-y-3">
        {paragraphs.map((p, idx) => {
          const isListItem = p.type === "list";
          
          if (isListItem) {
            return (
              <ul key={idx} className="list-disc pl-5 my-2">
                <li className="text-base text-gray-700">{p.content}</li>
              </ul>
            );
          }
          
          return (
            <p key={idx} className="text-base text-gray-700 leading-relaxed">
              {p.content}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};
```

### Lưu ý khi tối ưu CSS cho chế độ Mixed:
Khi render danh sách trong chế độ `mixed`, nếu các thẻ `<li>` nằm sát nhau, việc bọc từng thẻ `<li>` trong một thẻ `<ul>` riêng biệt có thể tạo ra khoảng cách (margin) không mong muốn. Để khắc phục, bạn có thể gom các phần tử `list` liên tiếp vào chung một thẻ `<ul>`, hoặc định nghĩa class CSS như ví dụ trên với `pl-5` và khoảng margin nhỏ phù hợp.

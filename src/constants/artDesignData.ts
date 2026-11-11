/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/*  - row / start / span / mt: vị trí trên lưới 12 cột (desktop)               */
/*  - speed: độ trôi parallax (px). Dương/âm = trôi ngược chiều nhau           */
/* -------------------------------------------------------------------------- */

export type Work = {
    id: string;
    title?: string;
    category: string;
    year: number;
    src: string;
    ratio?: number;
    row: number;
    start: number;
    span: number;
    mt: string;
    speed: number;
};

export const WORKS: Work[] = [
    {
        id: "w1",
        category: "Graphic design",
        year: 2026,
        src: "https://cdn.dribbble.com/userupload/49588016/file/947c582aac1d28610e3d77ce23813953.png?resize=1024x1537&vertical=center",
        ratio: 3 / 4,
        row: 1,
        start: 1,
        span: 4,
        mt: "0rem",
        speed: 50,
    },
    {
        id: "w2",
        category: "Graphic design",
        year: 2026,
        src: "https://cdn.dribbble.com/userupload/49588017/file/884848615b7aee55e75505bbd2870093.png?resize=1504x1131&vertical=center",
        ratio: 4 / 3,
        row: 1,
        start: 7,
        span: 5,
        mt: "9rem",
        speed: -70,
    },
    {
        id: "w3",
        category: "Graphic design",
        year: 2025,
        src: "https://cdn.dribbble.com/userupload/49588018/file/ce4c32f14e1faafa9fffb40d95f747fb.png?resize=1504x2137&vertical=center",
        ratio: 1,
        row: 2,
        start: 3,
        span: 3,
        mt: "2rem",
        speed: 90,
    },
    {
        id: "w4",
        category: "Graphic design",
        year: 2025,
        src: "https://cdn.dribbble.com/userupload/49588019/file/ede7ced0441709507983894d0e2ab224.png?resize=1504x2476&vertical=center",
        ratio: 9 / 13,
        row: 2,
        start: 9,
        span: 3,
        mt: "0rem",
        speed: -40,
    },
    {
        id: "w5",
        category: "Graphic design",
        year: 2025,
        src: "https://cdn.dribbble.com/userupload/49588014/file/662bf9a2ddc56919b133fa8760fad557.png?resize=1504x1880&vertical=center",
        ratio: 3 / 2,
        row: 3,
        start: 1,
        span: 5,
        mt: "4rem",
        speed: 60,
    },
    {
        id: "w6",
        category: "Graphic design",
        year: 2025,
        src: "https://cdn.dribbble.com/userupload/49588015/file/643747f536965738b5fae1ad4cb557e1.png?resize=1504x1880&vertical=center",
        ratio: 9 / 11,
        row: 3,
        start: 8,
        span: 4,
        mt: "12rem",
        speed: -80,
    },
];

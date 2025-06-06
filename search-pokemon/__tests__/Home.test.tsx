import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page'; // ใช้ @/app/page เพื่ออ้างอิงถึงไฟล์ page.tsx ได้เลย
import { MockedProvider } from '@apollo/client/testing';

// 1. เราต้อง "ปลอม" (Mock) การทำงานของ next/navigation
// เพราะในสภาพแวดล้อมการเทส จะไม่มี Router หรือ URL จริงๆ ให้ใช้งาน
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(), // ฟังก์ชัน push จำลองที่ไม่ทำอะไรเลย
  }),
  useSearchParams: () => ({
    get: () => null, // จำลองว่าเริ่มต้นแบบไม่มี search param ใน URL
  }),
}));

// 2. describe คือการจัดกลุ่มของเทสที่เกี่ยวข้องกัน
describe('Home Page', () => {

  // 3. it คือ 1 เคสทดสอบ (test case)
  it('should render the main heading and search button correctly', () => {

    // 4. render Component ที่เราต้องการทดสอบ
    // ต้องครอบด้วย MockedProvider เพราะ Home component ของเรามีการใช้ useQuery
    render(
      <MockedProvider mocks={[]}>
        <Home />
      </MockedProvider>
    );

    // 5. ใช้ screen.getByRole เพื่อค้นหาสิ่งที่ควรจะอยู่บนหน้าจอ
    const heading = screen.getByRole('heading', { name: /pokémon search/i });
    const button = screen.getByRole('button', { name: /search/i });

    // 6. expect คือการยืนยันว่าสิ่งที่เราค้นหานั้น "มีอยู่จริง" ในหน้าจอ
    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
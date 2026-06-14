import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'

export const metadata = {
  title: "Himanshu Sharma | Full-Stack Developer",
  description: "Portfolio of Himanshu Sharma, a Computer Engineering student specializing in full-stack development, algorithms, and cloud technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RefreshRedirect />
        {children}
      </body>
    </html>
  );
}
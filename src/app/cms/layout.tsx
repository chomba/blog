import "./layout.css";

export default function csmLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="cms-wrapper">
            {children}
        </div>
    );
}
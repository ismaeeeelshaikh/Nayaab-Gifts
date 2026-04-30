export default function PrivacyPage() {
    return (
        <div className="container max-w-4xl py-12">
            <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
            <div className="space-y-6 text-muted-foreground">
                <p>Last updated: {new Date().getFullYear()}</p>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">1. Introduction</h2>
                    <p>
                        At Nayaab Gifts, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Nayaab Gifts and how we use it.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">2. Information We Collect</h2>
                    <p>
                        The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Contact information (Name, Email, Phone number)</li>
                        <li>Shipping address</li>
                        <li>Payment information (Processed securely by third-party processors)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
                    <p>
                        We use the information we collect in various ways, including to:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Process your transactions and manage your orders</li>
                        <li>Send you emails regarding your order status</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">4. Log Files</h2>
                    <p>
                        Nayaab Gifts follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">5. Data Protection</h2>
                    <p>
                        We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
                    </p>
                </section>
            </div>
        </div>
    );
}

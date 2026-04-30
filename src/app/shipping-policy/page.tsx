export default function ShippingPolicyPage() {
    return (
        <div className="container max-w-4xl py-12">
            <h1 className="mb-8 text-3xl font-bold">Shipping & Delivery Policy</h1>
            <div className="space-y-6 text-muted-foreground">

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">1. Processing Time</h2>
                    <p>
                        All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">2. Shipping Rates & Delivery Estimates</h2>
                    <p>
                        Shipping charges for your order will be calculated and displayed at checkout.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li><strong>Standard Delivery:</strong> 5-7 business days</li>
                        <li><strong>Express Delivery:</strong> 2-3 business days (if available)</li>
                    </ul>
                    <p className="mt-2">
                        Delivery delays can occasionally occur.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">3. Shipment Confirmation & Order Tracking</h2>
                    <p>
                        You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). You can also track your order status directly from your "My Orders" page on our website.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-foreground">4. Damages</h2>
                    <p>
                        Nayaab Gifts is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
                    </p>
                </section>

            </div>
        </div>
    );
}

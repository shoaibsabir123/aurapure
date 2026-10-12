# Security Specification - Aura Pure Store

## 1. Data Invariants
- **Products**: Any public user can read products; only authorized administrators (`isAdmin()`) can create, modify, or delete products.
- **Orders**: Authenticated users can read their own orders (`resource.data.userId == request.auth.uid`). Users can create orders with their own `userId` or guest email. Only administrators can update order status (e.g. processing, shipped, delivered) and tracking number.
- **Reviews**: Verified reviews can be read publicly. Creation requires authenticated user matching author identity (`request.auth.uid == incoming().userId`) or legitimate review submission.
- **Blog Posts**: Public read access. Create, update, and delete access strictly restricted to administrators.
- **Coupons**: Public read access to active coupons for discount validation. Admin-only write access.
- **Default Deny**: All unspecified paths denied via global fallback.

## 2. The "Dirty Dozen" Payloads
1. **Malicious Role Escalation**: User attempting to write directly to `/admins/{uid}` to grant self admin privilege. (Expected: DENIED)
2. **Product Price Tampering**: Regular authenticated user attempting to update a product price to $0.01. (Expected: DENIED)
3. **Foreign Order Snooping**: User A attempting to list or read Order belonging to User B. (Expected: DENIED)
4. **Order Status Falsification**: Customer attempting to flip their order status from `pending` to `delivered`. (Expected: DENIED)
5. **Junk ID Poisoning**: Attempting to create a document with a 2KB junk character ID. (Expected: DENIED)
6. **Negative Price Injection**: Attempting to write an order with a negative total to obtain credit. (Expected: DENIED)
7. **Blog Post Hijacking**: Unauthenticated or customer account attempting to modify or delete a blog post. (Expected: DENIED)
8. **Shadow Field Injection**: Attempting to inject hidden `isSuperAdmin: true` field into user profile. (Expected: DENIED)
9. **Fake Email Admin Claim**: Attempting to access admin routes with unverified spoofed email. (Expected: DENIED)
10. **Coupon Percentage Manipulation**: Customer attempting to create a 100% off coupon code. (Expected: DENIED)
11. **Review Impersonation**: User A posting a review claiming to be User B. (Expected: DENIED)
12. **Unauthenticated Order Update**: Guest attempting to delete an order record. (Expected: DENIED)

## 3. Test Runner Invariants
All twelve malicious payloads must return `PERMISSION_DENIED` across security evaluation test fixtures.

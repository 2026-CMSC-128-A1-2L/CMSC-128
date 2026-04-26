# Backend Overview

## Features

### Activity

- Also called _Audit Log_

### Application

### Billing

- Also called _Payment_

### Booking

- Also called _Ocular Visits_ or _Visits_

### Bookmark

- Also called _Wishlist_

### Facility

- Also called _Housing Facility_, _Building_, or _Property_

### File

### Invite

### Listing

- Also called _Room Type_ or _Unit Type_

### Message

### Notification

- Also called _System Notifications_

### Rental

### Report

### Review

### Tag

- A combination of amenities and rules.
- Anything that a User can filter and search for in a room should be a tag.

### Transfer

- Also called _Transfer Request_ or _Pasalo_

### Unit

- Also called a _Unit_

### User

### Session

### Calendar

### Document

### Profile

## Roles

Admin

- website admin
- verifies users
- processes reports

Manager

- manages facilities
- has a subset of the permissions of the landlord for each facility assigned
  to them

Landlord

- special kind of manager
- only one who can make facilities
- has all permissions for managing the facility

Student

- tenants of the facilities
- can apply, book for a visit, and review dormitories

## Architecture

Uses a filter created in the middlware which is passed down to the service for
role-based access control.

Pagination uses keyset/cursor-based pagination.

## Endpoints

```text
// Can be used by managers and landlords to look at
GET /dashboard

// Gets the financial report.
POST /dashboard/reports/financial

GET /dashboard/reports/financial

// Can only be used by the admin and managers.
GET /facilities

// Can only be used by anyone. This should always return only the
// public information for the facilities. Managers should use the
// GET /facilities endpoint to get private information.
POST /facilities/search

// Returned data depends on the user type.
//
// Returns public facility data, listing data, and public landlord and manager
// data for students.
// Returns public facility data and listing data for managers.
GET /facilities/:facilityId

// Can only be used by landlords
POST /facilities

// Requires the `manageListings` permission
PATCH /facilities/:facilityId

// Requires the `deleteListings` permission
DELETE /facilities/:facilityId

// Used by the landlord to manage managers and their permissions
POST /facilities/:facilityId/managers
PATCH /facilities/:facilityId/managers/:managerId
DELETE /facilities/:facilityId/managers/:managerId

// Requires the `manageListings` permission
POST /facilities/:facilityId/listings

// Can be viewed by any verified user
GET /facilities/:facilityId/reviews

// Requires the `manageBookings` permission
GET /facilities/:facilityId/bookings

// By a landlord to get all invites
GET /facilities/:facilityId/invites

// By a landlord to invite a manager
POST /facilities/:facilityId/invites

// Refer to document endpoints.
//
// Owner is the landlord
// Verifier is the admin
GET /facilities/:facilityId/documents/*

// Used by the admin
POST /facilities/:facilityId/approve
POST /facilities/:facilityId/reject

// For the creation of legacy rental entries
POST /rentals

// Used by managers to view rentals in their managed facilities
GET /rentals
GET /rentals/:rentalId

// Possibly unused
PATCH /rentals/:rentalId

// Used by managers
POST /rentals/:rentalId/move-in
POST /rentals/:rentalId/move-out

// Used by any user
GET /notifications
GET /notifications/:notificationId
POST /notifications/:notificationId/read

// Used to log-in
GET /auth/google
GET /auth/google/callback

// Creates fake test users
POST /test/register
POST /test/login

// Used by managers to view applications across their facilities
GET /applications

// Used by students to apply to a listing
POST /applications

// Used by the student or the manager
GET /applications/:applicationId

// Used by the student
DELETE /applications/:applicationId

// Used by the manager and the landlord for both steps of the
// verification.
POST /applications/:applicationId/approve
POST /applications/:applicationId/reject

// Assigns a unit to an application
POST /applications/:applicationId/assign-unit

// Used by any user to know what tags they can filter with
GET /tags

// Used by the admin
POST /tags
PATCH /tags/:tagName
DELETE /tags/:tagName

// Used by managers to get a listing
GET /listings/:listingId

// Requires the `manageListing` permission.
//
// Used by managers to edit listings
PATCH /listings/:listingId

// Requires the `deleteListing` permission.
//
// Only does a soft-delete, will be hidden from the manager's UI.
DELETE /listings/:listingId

// Used by managers to edit listing tags
PATCH /listings/:listingId/tags

// Used by managers to get unit details
GET /listings/:listingId/units

// Used by managers to add a unit
POST /listings/:listingId/units

// Used by managers
GET /listings/:listingId/applications
GET /listings/:listingId/rentals

// Can be used by students or managers
GET /listings/:listingId/reviews

// Used by students to add a review to
POST /listings/:listingId/review

// Used by students to report a listing
POST /listings/:listingId/report

// Used by students to add a bookmark
POST /listings/:listingId/bookmark
DELETE /listings/:listingId/bookmark

// Used by students to view a manager's public profile
GET /profiles/:userId

// Used by managers to view lease transfers across their facilities
GET /transfers

// Used by students to apply for a lease transfer
POST /transfers

// Used by managers to approve or deny a lease transfer
POST /transfers/:transferId/approve
POST /transfers/:transferId/reject

// Cancel a lease transfer request
DELETE /transfers/:transferId

// Used by students to attach a document to the lease transfer
GET /transfers/:transferId/documents
POST /transfers/:transferId/documents
DELETE /transfers/:transferId/documents/:documentId

// Used by managers to view lease transfers across their facilities
GET /bookings

// Apply for a visit booking
POST /bookings

// Possibly unused
PATCH /bookings/:bookingId

// Cancel a booking
DELETE /bookings/:bookingId

// Used by the manager to approve or reject a booking
POST /bookings/:bookingId/approve
POST /bookings/:bookingId/reject

// Used by managers to view billings across their facilities
GET /billings

// Used by manager to assign a billing to a tenant
POST /billings

// Used by manager or a tenant to view billing details
GET /billings/:billingId

// Used by manager to edit the details of a billing.
PATCH /billings/:billingId

// Used by manager to mark a billing as verified, and set the value.
POST /billings/:billingId/verify

// Refer to document endpoints.
//
// Owner is the tenant
// Verifier is a manager
GET /billings/:billingId/documents/*

// Used by a manager to accept or reject an invite
POST /invites/:inviteId/accept
POST /invites/:inviteId/decline

// Used by managers to view units across their facilities
GET /units

// Used by managers to view a unit's details
GET /units/:unitId

// Used by managers to edit a unit's details
PATCH /units/:unitId

// Used by managers to delete a unit
//
// Should be a soft-delete
DELETE /units/:unitId

// Used by managers to see all rentals in a unit
GET /units/:unitId/rentals

// Requires the `manageBilling` permission
GET /units/:unitId/billings

// Upload files
POST /files

// List all reports
GET /reports

// Resolve a report
POST /reports/:reportId/resolve

// List all activites, filtered
GET /activities

// Get all conversations
GET /messages

// Get messages to/from user, paginated
GET /messages/:userId

// Send a message to a user
POST /messages/:userId

// Used by the admin to get all users
GET /users

// Used by a user to see their own details
GET /users/me

// Edit own data
PATCH /users/me

// Delete own account
DELETE /users/me

// Sets one's own user type
POST /users/me/onboard

// Get a student's own details
GET /users/me/applications
GET /users/me/rentals
GET /users/me/billings
GET /users/me/bookings
GET /users/me/bookmarks

// Get a student or a manager's own calendar
GET /users/me/calendar

// Get a manager's or landlord's own invites
GET /users/me/invites

// Used by the admin to get a user's data
GET /users/:userId

// Used by the admin to disable a user's account
DELETE /users/:userId

// Used by managers to report a user
POST /users/:userId/report

// Refer to document endpoints.
//
// Owner is the user
// Verifier is the admin
POST /users/:userId/documents/*

// Used by the admin to approve/reject a user's verification
POST /users/:userId/approve
POST /users/:userId/reject

// Used by the admin to review the reviews
GET /reviews

// Used by the admin to let the review be public
POST /reviews/approve
POST /reviews/reject

// Used by the student to delete their own review
DELETE /reviews/:reviewId
```

### Document Endpoints

```text
// General document upload and verification flow.
//
// Endpoints 1, 2, and 3 can be used by the user
// Endpoints 1, 4, and 5 can be used by the verifier
GET .../documents
POST .../documents/:docId/files
DELETE .../documents/:docId/files/:fileId
POST .../documents/:docId/accept
POST .../documents/:docId/reject
```

## Flows

### Onboarding and User Verification

- A user starts at 'setup', which do not have a user type.
- After a user chooses a type and puts in their details, they will be
  'unverified'.
- An unverified user can only see their own details and look at public
  facilities. They cannot apply nor see the reviews.
- After a user uploads their documents and gets it verified by the admin,
  the admin can make them verified. This only applies for landlords and
  students. Managers are verified if they are a manager of any facility.
- Verification lasts for 1 year for students, and indefinitely for landlords
- If a verification expires, their status changes to `unverified`.
- They should still be able to access their information.
- A user can be deleted by the admin, or they can delete their account
  themselves.

### Dorm Application

### Booking

### Rental

### Document

- This applies for facilities, lease transfers

### Manager Invitation

- A landlord sends an invite to an email to be a manager for a facility.
- If the account already exists, and is not a manager account, it should fail.
- If the account does not exist yet, the account needs to be made before
  accepting the application.
- When a manager accepts the invitation, if their status isn't `verified`,
  their status changes to `verified.

### Dorm Review

- After a user submits a review, it will have the status `unverified`.
- This does not contribute to the average rating of a building.
- After the admin verifies it, it will have the status `verified`.

### Report

# CHANGELOG

## [1.2.0] (2020-10-04)

Verify compatibility with 0.7.3

### FIXED

- Fixed an issue where creating a new item, actor, or macro would pop up a warning message for all connected players.

### CHANGED

- Removed the unnecessary dependency on the dnd5e system. Should be completely system agnostic now.

## [1.1.0] (2020-06-09)

Restructured repo in this release, recommend reinstall from scratch.

### ADDED

- Configurable default token image (separate from actor portrait).

### FIXED

- Fixed an issue where default token wasn't being set in some cases (may be related to a change in 0.6.2).

## [1.0.1] (2020-05-27) *Unavailable*

### FIXED

- Fixed an issue where importing an actor or item from a compendium with an image already set would overwrite the existing image.

## [1.0.0] (2020-15-26) *Unavailable*

### ADDED

- Added module settings for configuring default images for Actors, Items, OwnedItems, and Macros.
- Added functionality to replace the default mystery-man image for those things

# @strapi/design-system

## 2.0.0-rc.17

### Major Changes

- [#1855](https://github.com/strapi/design-system/pull/1855) [`ac908a2`](https://github.com/strapi/design-system/commit/ac908a2437760c0a79a55b558ac5835b02cf7078) Thanks [@HichamELBSI](https://github.com/HichamELBSI)! - Migration guide update

### Minor Changes

- [#1850](https://github.com/strapi/design-system/pull/1850) [`1d5c646`](https://github.com/strapi/design-system/commit/1d5c646918c707626773751ff80460249d55f0bb) Thanks [@markkaylor](https://github.com/markkaylor)! - add start and end icons to MenuItem

### Patch Changes

- Updated dependencies [[`ac908a2`](https://github.com/strapi/design-system/commit/ac908a2437760c0a79a55b558ac5835b02cf7078)]:
  - @strapi/ui-primitives@2.0.0-rc.17

## 2.0.0-rc.16

### Patch Changes

- [#1847](https://github.com/strapi/design-system/pull/1847) [`e25a380`](https://github.com/strapi/design-system/commit/e25a3804d3d3e836d8fd79c09cb7e4e0768bb202) Thanks [@remidej](https://github.com/remidej)! - fix: pass menu separator ref

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-rc.16

## 2.0.0-rc.15

### Major Changes

- [#1835](https://github.com/strapi/design-system/pull/1835) [`fd5e74b`](https://github.com/strapi/design-system/commit/fd5e74b5f449975833e2eb3271fd271b1cddee88) Thanks [@HichamELBSI](https://github.com/HichamELBSI)! - Bump ViteJS

### Minor Changes

- [#1822](https://github.com/strapi/design-system/pull/1822) [`3d7125f`](https://github.com/strapi/design-system/commit/3d7125fe5f2c6cd8fe7e3e8c56b770b85ef63851) Thanks [@mukulpadwal](https://github.com/mukulpadwal)! - Added XS size variant to IconButton component for smaller button options.

### Patch Changes

- [#1846](https://github.com/strapi/design-system/pull/1846) [`a511ac5`](https://github.com/strapi/design-system/commit/a511ac5ff8fb34cd81903aecbacd032442121909) Thanks [@remidej](https://github.com/remidej)! - feat: add menu separator component

- [#1833](https://github.com/strapi/design-system/pull/1833) [`ba28ea1`](https://github.com/strapi/design-system/commit/ba28ea1190f9aea82fceb64d40f08a05642b54fa) Thanks [@ShatilKhan](https://github.com/ShatilKhan)! - cleaner search bar

- [#1845](https://github.com/strapi/design-system/pull/1845) [`ef9cd18`](https://github.com/strapi/design-system/commit/ef9cd1806a9bcba5762caa14b4cbafa7309d23aa) Thanks [@remidej](https://github.com/remidej)! - feat: add onCloseAutoFocus to Menu.Content

- [#1840](https://github.com/strapi/design-system/pull/1840) [`cbf07ea`](https://github.com/strapi/design-system/commit/cbf07ea0c927e9067ed037c1705068199ba81256) Thanks [@dzakki](https://github.com/dzakki)! - sync view source to the correct path

- [#1821](https://github.com/strapi/design-system/pull/1821) [`0693ce9`](https://github.com/strapi/design-system/commit/0693ce92f711bbff280dcd21d952bdc8a423892c) Thanks [@PlanckConst](https://github.com/PlanckConst)! - fix: Checkbox Item Not Centered

  Added justify-content: center and align-items: center to Checkbox Indicator component

  Original:

  const CheckboxIndicator = styled(Checkbox.Indicator)`  width: 100%;
height: 100%;
cursor: pointer;`;

  Updated:

  const CheckboxIndicator = styled(Checkbox.Indicator)`

  - display: inline-flex;
  - pointer-events: auto !important;
    width: 100%;
    height: 100%;
    cursor: pointer;
  - justify-content: center;
  - align-items: center;
    `;

  Refactored inline styling and added it to checkbox indicator stype component

  Original:

  `<CheckboxIndicator style={{ display: 'inline-flex', pointerEvents: 'auto'}} forceMount>`

  Updated:

  `<CheckboxIndicator forceMount>`

- [#1844](https://github.com/strapi/design-system/pull/1844) [`1b5a2d0`](https://github.com/strapi/design-system/commit/1b5a2d078c20abd63ea531a348fa9df71b1593b9) Thanks [@jorrit](https://github.com/jorrit)! - Fix inflated package size because direct dependencies not listed in package.json

- [#1834](https://github.com/strapi/design-system/pull/1834) [`bf538d1`](https://github.com/strapi/design-system/commit/bf538d1bb5ea599b49ec8b54595f16cea19c3ac1) Thanks [@mazzucchelli](https://github.com/mazzucchelli)! - Prevent tooltip from rendering when the label property is not passed

- Updated dependencies [[`1b5a2d0`](https://github.com/strapi/design-system/commit/1b5a2d078c20abd63ea531a348fa9df71b1593b9), [`fd5e74b`](https://github.com/strapi/design-system/commit/fd5e74b5f449975833e2eb3271fd271b1cddee88)]:
  - @strapi/ui-primitives@2.0.0-rc.15

## 2.0.0-rc.14

### Minor Changes

- [#1826](https://github.com/strapi/design-system/pull/1826) [`0871c2c`](https://github.com/strapi/design-system/commit/0871c2c89259cd99f5f3198c476adc2a11d5ab32) Thanks [@mukulpadwal](https://github.com/mukulpadwal)! - Updated hover styles to apply correct color for text and SVG icons

### Patch Changes

- [#1829](https://github.com/strapi/design-system/pull/1829) [`a63bb74`](https://github.com/strapi/design-system/commit/a63bb74214de8ef5d58dae85bb05e0ebd64a6ee8) Thanks [@markkaylor](https://github.com/markkaylor)! - add disabled prop to menu trigger not applied through asChild

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-rc.14

## 2.0.0-rc.13

### Minor Changes

- [#1812](https://github.com/strapi/design-system/pull/1812) [`663daf7`](https://github.com/strapi/design-system/commit/663daf7727b8b9f51ddc25ba44eb33bae9ae634a) Thanks [@butcherZ](https://github.com/butcherZ)! - add a11y add-on for storybook

### Patch Changes

- Updated dependencies [[`f2ad83e`](https://github.com/strapi/design-system/commit/f2ad83ec069cf2a279b1cfd0852f7a56fc5b608a)]:
  - @strapi/ui-primitives@2.0.0-rc.13

## 2.0.0-rc.12

### Minor Changes

- [#1794](https://github.com/strapi/design-system/pull/1794) [`8bd760b`](https://github.com/strapi/design-system/commit/8bd760b3ad7c06e0da5f2dccd60762f1c1cf2ef3) Thanks [@jhoward1994](https://github.com/jhoward1994)! - pass props to icons in accordion triggers

### Patch Changes

- [#1801](https://github.com/strapi/design-system/pull/1801) [`bcc2862`](https://github.com/strapi/design-system/commit/bcc2862e3d966394c2d94fbabb3901fb307496d8) Thanks [@remidej](https://github.com/remidej)! - add xs size to status component

- [#1793](https://github.com/strapi/design-system/pull/1793) [`fae2bf8`](https://github.com/strapi/design-system/commit/fae2bf8fa1569c97a1e6cdabcfc11e3013b1e734) Thanks [@Sam-Phillemon9493](https://github.com/Sam-Phillemon9493)! - patch for hovering effect

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-rc.12

## 2.0.0-rc.11

### Patch Changes

- [#1774](https://github.com/strapi/design-system/pull/1774) [`ee58ac1`](https://github.com/strapi/design-system/commit/ee58ac15e4708a11886d216ba8b4a940c96bc646) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: accordian styles

- [#1784](https://github.com/strapi/design-system/pull/1784) [`6f405fa`](https://github.com/strapi/design-system/commit/6f405fac3232ceac8b0a89bdce3bc3a8fdd52e86) Thanks [@remidej](https://github.com/remidej)! - fix carousel input icons

- [#1786](https://github.com/strapi/design-system/pull/1786) [`dc49935`](https://github.com/strapi/design-system/commit/dc4993576fad6c739c5fc0c912c204a7eeff3caf) Thanks [@Feranchz](https://github.com/Feranchz)! - fix select bugs with startIcon

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-rc.11

## 2.0.0-rc.10

### Patch Changes

- [#1780](https://github.com/strapi/design-system/pull/1780) [`4e0baaf`](https://github.com/strapi/design-system/commit/4e0baaf6f5c4cda412260f39145451c33ae596e1) Thanks [@HichamELBSI](https://github.com/HichamELBSI)! - fix various size issues

- [#1775](https://github.com/strapi/design-system/pull/1775) [`9babd08`](https://github.com/strapi/design-system/commit/9babd08603970b3455ca1c6f66e229bf95012c86) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: responsive breakpoint for large screens updated to 1080px as per design

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-rc.10

## 2.0.0-rc.9

### Patch Changes

- [#1770](https://github.com/strapi/design-system/pull/1770) [`49bf5c1`](https://github.com/strapi/design-system/commit/49bf5c1192f28c75416dd9669c7bf2c747fb60a0) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: multiple ui style fixes

- [#1771](https://github.com/strapi/design-system/pull/1771) [`d230d45`](https://github.com/strapi/design-system/commit/d230d450f8a030a52302ee077cc6d67508e7cfd2) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: animations fixed as per requirement

- Updated dependencies [[`49bf5c1`](https://github.com/strapi/design-system/commit/49bf5c1192f28c75416dd9669c7bf2c747fb60a0), [`f949efb`](https://github.com/strapi/design-system/commit/f949efbb70d5c4f7d30fb53564c47a79dce20357)]:
  - @strapi/ui-primitives@2.0.0-rc.9

## 2.0.0-rc.8

### Major Changes

- [#1737](https://github.com/strapi/design-system/pull/1737) [`daae1f0`](https://github.com/strapi/design-system/commit/daae1f0b4da19febf0804783195c9e1c6245b82c) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - feat: responsive props are now supported in base Box component and removed existing media queries from theme

### Patch Changes

- [#1758](https://github.com/strapi/design-system/pull/1758) [`4b0cf89`](https://github.com/strapi/design-system/commit/4b0cf89292b2b3e52c68967f5121aae93707057b) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - simple menu with icon should work now as expected

- [#1760](https://github.com/strapi/design-system/pull/1760) [`6972656`](https://github.com/strapi/design-system/commit/6972656070c585fbc03e4faab29e000271ea51a1) Thanks [@simotae14](https://github.com/simotae14)! - fix aria-disabled css rule on menu item

- [#1769](https://github.com/strapi/design-system/pull/1769) [`0928a5d`](https://github.com/strapi/design-system/commit/0928a5de1eb12e059df3f6e8b735d751b5237a58) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: field input padding updated to show correct highlight in autocomplete

- [#1769](https://github.com/strapi/design-system/pull/1769) [`0928a5d`](https://github.com/strapi/design-system/commit/0928a5de1eb12e059df3f6e8b735d751b5237a58) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: ghost button active style border removed

- [#1759](https://github.com/strapi/design-system/pull/1759) [`2ee82d3`](https://github.com/strapi/design-system/commit/2ee82d34ab68e1a788e8eb636b12f414ff4b68ca) Thanks [@simotae14](https://github.com/simotae14)! - change modal content height and max height

- [#1764](https://github.com/strapi/design-system/pull/1764) [`69b23b7`](https://github.com/strapi/design-system/commit/69b23b742442ea4123c4d771ffb865cd4369fefc) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: badge to allow possible values for background and text color

- [#1765](https://github.com/strapi/design-system/pull/1765) [`ae052a2`](https://github.com/strapi/design-system/commit/ae052a278ce281819a31450fe2e756422cdf7e19) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: link hover color apply to its label and not to children

- [#1761](https://github.com/strapi/design-system/pull/1761) [`60dd5ee`](https://github.com/strapi/design-system/commit/60dd5ee4c91767c7f667508b09e30b56b25ffc17) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: icon button default size updated to small

- [#1754](https://github.com/strapi/design-system/pull/1754) [`2c9c4ea`](https://github.com/strapi/design-system/commit/2c9c4ea0727bbaed69152a26935f95f08cf4f915) Thanks [@jhoward1994](https://github.com/jhoward1994)! - change github action to use default github secret

- [#1766](https://github.com/strapi/design-system/pull/1766) [`d62d58b`](https://github.com/strapi/design-system/commit/d62d58b8199afbd0e2f66fd77c09ffd8a41d2222) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: removed static placeholder from subnavheader

- [#1769](https://github.com/strapi/design-system/pull/1769) [`0928a5d`](https://github.com/strapi/design-system/commit/0928a5de1eb12e059df3f6e8b735d751b5237a58) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: popover default border radius added

- Updated dependencies [[`2c9c4ea`](https://github.com/strapi/design-system/commit/2c9c4ea0727bbaed69152a26935f95f08cf4f915)]:
  - @strapi/ui-primitives@2.0.0-rc.8

## 2.0.0-rc.7

### Minor Changes

- [#1748](https://github.com/strapi/design-system/pull/1748) [`61936d6`](https://github.com/strapi/design-system/commit/61936d63f6b7eb390b351138c48572442d5b1e4c) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore: standardise forwardRefs across components

### Patch Changes

- [#1738](https://github.com/strapi/design-system/pull/1738) [`8a87483`](https://github.com/strapi/design-system/commit/8a87483c72022298ddc29ca47f26804039d0b1c5) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix(IconButton): sizing was wrong compared to other buttons

- [#1750](https://github.com/strapi/design-system/pull/1750) [`d89c9c3`](https://github.com/strapi/design-system/commit/d89c9c3674a8d1f7b12f77a96be22495557e8971) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - Fixed: Link doesn't show the hover color

- [#1753](https://github.com/strapi/design-system/pull/1753) [`9df216b`](https://github.com/strapi/design-system/commit/9df216bc0bb5cec70bffe83f52472cbc381005ca) Thanks [@simotae14](https://github.com/simotae14)! - fixed Modal Content scroll issues

- [#1752](https://github.com/strapi/design-system/pull/1752) [`90da62e`](https://github.com/strapi/design-system/commit/90da62e00b1ffd3b00fc37291820d243c76bdab9) Thanks [@remidej](https://github.com/remidej)! - fixed SubNavHeader not applying space between label and search icon

- [#1749](https://github.com/strapi/design-system/pull/1749) [`c7c5ad6`](https://github.com/strapi/design-system/commit/c7c5ad6c1e98dbd7b442d977420818f52661e117) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - fix: add click action on tag icon instead of on tag itself

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-rc.7

## 2.0.0-beta.6

### Major Changes

- [#1734](https://github.com/strapi/design-system/pull/1734) [`9ec3c38`](https://github.com/strapi/design-system/commit/9ec3c383819631a84d2d7c4b8e01429273da1f7c) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore: refactor Switch to use radix primitive

- [#1732](https://github.com/strapi/design-system/pull/1732) [`4972ad1`](https://github.com/strapi/design-system/commit/4972ad1d00b8090043e355010966ae555816e0a8) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore: refactor ProgressBar to use radix primitive

### Minor Changes

- [#1735](https://github.com/strapi/design-system/pull/1735) [`de40090`](https://github.com/strapi/design-system/commit/de400909c70e74897b49068dfdc53d7b938d8a2e) Thanks [@joshuaellis](https://github.com/joshuaellis)! - feat: reimplement size prop

- [`7e1c4b0`](https://github.com/strapi/design-system/commit/7e1c4b0a695045bcc8df59c23a5d93ff86b6af91) Thanks [@joshuaellis](https://github.com/joshuaellis)! - feat(multiselect): add size prop

### Patch Changes

- [`7e1c4b0`](https://github.com/strapi/design-system/commit/7e1c4b0a695045bcc8df59c23a5d93ff86b6af91) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix(link): isExternal should be false by default

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.6

## 2.0.0-beta.5

### Major Changes

- [#1725](https://github.com/strapi/design-system/pull/1725) [`a292dc3`](https://github.com/strapi/design-system/commit/a292dc33be01d4fc344bafa9542e5085841a546a) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore!: refactor Radio to use radix primitive

- [#1725](https://github.com/strapi/design-system/pull/1725) [`6040949`](https://github.com/strapi/design-system/commit/6040949240cd68368c39aa0469c047d03541d00b) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore!: refactor ModalLayout to Modal and use radix-ui primitives

- [#1727](https://github.com/strapi/design-system/pull/1727) [`490835e`](https://github.com/strapi/design-system/commit/490835ecd3b4a93ffbe4b6b4b8ea712e0635ff4f) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore!: refactor Dialog component to use radix primitive

- [#1725](https://github.com/strapi/design-system/pull/1725) [`5ff487b`](https://github.com/strapi/design-system/commit/5ff487b341896e146d550738fcdfc11aaff8694c) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore!: refactor Avatar component to use radix primitive

- [#1725](https://github.com/strapi/design-system/pull/1725) [`569133b`](https://github.com/strapi/design-system/commit/569133ba623ae1a96981e4e246c23fb88ccc79a1) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore!: refactor Checkbox to use radix primitive

- [#1725](https://github.com/strapi/design-system/pull/1725) [`6040949`](https://github.com/strapi/design-system/commit/6040949240cd68368c39aa0469c047d03541d00b) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore!: refactor Grid to be composite component

- [#1725](https://github.com/strapi/design-system/pull/1725) [`43d440e`](https://github.com/strapi/design-system/commit/43d440ebce50600ec21f2c3a897e4a440735c11a) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore!: refactor Tabs component to use radix primitive

- [#1725](https://github.com/strapi/design-system/pull/1725) [`a843b4c`](https://github.com/strapi/design-system/commit/a843b4cdbf7ed4537650b569524a27e64720c4a7) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore!: refactor Popover to use radix-ui primitive

### Minor Changes

- [#1727](https://github.com/strapi/design-system/pull/1727) [`490835e`](https://github.com/strapi/design-system/commit/490835ecd3b4a93ffbe4b6b4b8ea712e0635ff4f) Thanks [@joshuaellis](https://github.com/joshuaellis)! - feat: export useMeasure, useControllableState, useId & useIsomorphicLayoutEffect

- [#1725](https://github.com/strapi/design-system/pull/1725) [`f328dee`](https://github.com/strapi/design-system/commit/f328deec08c5dcdb83102dfdd5be2ed0e274c5dd) Thanks [@github-actions](https://github.com/apps/github-actions)! - feat: add ScrollArea component

- [#1725](https://github.com/strapi/design-system/pull/1725) [`a5c4031`](https://github.com/strapi/design-system/commit/a5c403128c42834dbfa28292557d5b586fc81864) Thanks [@github-actions](https://github.com/apps/github-actions)! - feat: add motion properties to theme as well as transitions

### Patch Changes

- [#1725](https://github.com/strapi/design-system/pull/1725) [`01ff7ca`](https://github.com/strapi/design-system/commit/01ff7ca11ad6cc6b7e35b7c336705aee66ab4a0a) Thanks [@github-actions](https://github.com/apps/github-actions)! - fix(design-system): edit Divider accessibility design

- [#1725](https://github.com/strapi/design-system/pull/1725) [`6040949`](https://github.com/strapi/design-system/commit/6040949240cd68368c39aa0469c047d03541d00b) Thanks [@github-actions](https://github.com/apps/github-actions)! - fix(design-system): time-picker icon was too small

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.5

## 2.0.0-beta.4

### Major Changes

- [#1722](https://github.com/strapi/design-system/pull/1722) [`f28dda1`](https://github.com/strapi/design-system/commit/f28dda1517acfa57edc1a2bb47aabf2061b516e3) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore!: streamline IconButton API

  - remove `icon` prop
  - remove `ariaLabel` prop
  - add `withTooltip` prop (default false)

  `children` & `label` are now required props.

- [#1718](https://github.com/strapi/design-system/pull/1718) [`981d6d0`](https://github.com/strapi/design-system/commit/981d6d0e8a9d19491c425d7b0f22c7eece479279) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore!: remove size from inputs

  `size` was used to give our inputs a fixed size, this would not have worked with different writing directions or be very responsive. Instead, we use logical padding values.

- [#1718](https://github.com/strapi/design-system/pull/1718) [`981d6d0`](https://github.com/strapi/design-system/commit/981d6d0e8a9d19491c425d7b0f22c7eece479279) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore!: all XXSize & XXVariant types are now singular

  This is consistent across the codebase.

- [#1720](https://github.com/strapi/design-system/pull/1720) [`7c81e86`](https://github.com/strapi/design-system/commit/7c81e867117f5f3383f447ea477f70d10d3f6e89) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore!: remove ThemeProvider

  `ThemeProvider` has been removed and replaced with `DesignSystemProvider`.

- [#1720](https://github.com/strapi/design-system/pull/1720) [`8b7afb1`](https://github.com/strapi/design-system/commit/8b7afb14a06d552e9d414b4e5609dd466f14b3f8) Thanks [@github-actions](https://github.com/apps/github-actions)! - chore!: change z-indexes on theme from array to dictionary

  `z-indices` on the theme object were an array of length 4. We've since changed this to a dictionary to help engineers understand how to correctly apply these values. See the `Elevation` documentation for more information.

- [#1719](https://github.com/strapi/design-system/pull/1719) [`dd79369`](https://github.com/strapi/design-system/commit/dd7936901f6f8a16658bd70c415bd0cd0cb4d3b4) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore!: remove deprecated options & change selectedDate prop to be value on DatePicker

- [#1721](https://github.com/strapi/design-system/pull/1721) [`940110c`](https://github.com/strapi/design-system/commit/940110cdb918d420e322a784fa31cf5700d8c47d) Thanks [@joshuaellis](https://github.com/joshuaellis)! - feat!: refactor Accordion to use radix primitive

  The Accordion API has changed significently whilst retaining it's functionality, we recommend your review the documentation to understand the changes and how to migrate your code.

- [#1722](https://github.com/strapi/design-system/pull/1722) [`f28dda1`](https://github.com/strapi/design-system/commit/f28dda1517acfa57edc1a2bb47aabf2061b516e3) Thanks [@joshuaellis](https://github.com/joshuaellis)! - feat!: refactor Tooltip to use radix-ui

  The Tooltip API has changed significently whilst retaining it's functionality, we recommend your review the documentation to understand the changes and how to migrate your code.

### Patch Changes

- [#1720](https://github.com/strapi/design-system/pull/1720) [`063e574`](https://github.com/strapi/design-system/commit/063e5742a6f652b7be49a64bd531d692d8d3983f) Thanks [@github-actions](https://github.com/apps/github-actions)! - fix(accordion): variant should apply to header not all accordions

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.4

## 2.0.0-beta.3

### Major Changes

- [#1693](https://github.com/strapi/design-system/pull/1693) [`ec2fc0c`](https://github.com/strapi/design-system/commit/ec2fc0c6c92c8bd0d67026676390b4317f3f49d9) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - enhancement!: removed field wrapper components from inputs to streamline and inputs stories are moved under `stories/inputs` folder.

- [#1693](https://github.com/strapi/design-system/pull/1693) [`ec2fc0c`](https://github.com/strapi/design-system/commit/ec2fc0c6c92c8bd0d67026676390b4317f3f49d9) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!: remove CreatableCombobox

  Users should instead use `<Combobox createable />`.

- [#1695](https://github.com/strapi/design-system/pull/1695) [`649d0f5`](https://github.com/strapi/design-system/commit/649d0f57cbcc595a84a23e762e47c281a661a906) Thanks [@christiancp100](https://github.com/christiancp100)! - chore!: default color for Typography is currentColor

- [#1693](https://github.com/strapi/design-system/pull/1693) [`ec2fc0c`](https://github.com/strapi/design-system/commit/ec2fc0c6c92c8bd0d67026676390b4317f3f49d9) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - enhancement!: ToggleInput renamed to just Toggle

- [#1710](https://github.com/strapi/design-system/pull/1710) [`adbe237`](https://github.com/strapi/design-system/commit/adbe237f6735c1efada97e96b8afb99cb7fb6427) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore!: CardAction is now a react component

- [#1713](https://github.com/strapi/design-system/pull/1713) [`1613d94`](https://github.com/strapi/design-system/commit/1613d94e6ad9ee06ba0da6e290181a8cf708b8b0) Thanks [@joshuaellis](https://github.com/joshuaellis)! - feat!: refactor Field api

- [#1703](https://github.com/strapi/design-system/pull/1703) [`54ebfad`](https://github.com/strapi/design-system/commit/54ebfadc4c59d1f2c7b6923493916a7dc91025a3) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!: removed CMS specific components.The following components have been removed from DS and moved to CMS where it belongs.

  - `Layout`
  - `HeaderLayout`
  - `TwoColsLayout`
  - `GridLayout`
  - `ActionLayout`
  - `ContentLayout`

- [#1695](https://github.com/strapi/design-system/pull/1695) [`649d0f5`](https://github.com/strapi/design-system/commit/649d0f57cbcc595a84a23e762e47c281a661a906) Thanks [@christiancp100](https://github.com/christiancp100)! - chore: Box/Flex/Grid & Typography are now all react components, they are no longer styled-components.

- [#1695](https://github.com/strapi/design-system/pull/1695) [`649d0f5`](https://github.com/strapi/design-system/commit/649d0f57cbcc595a84a23e762e47c281a661a906) Thanks [@christiancp100](https://github.com/christiancp100)! - chore: update to use styled-components@6

- [#1695](https://github.com/strapi/design-system/pull/1695) [`649d0f5`](https://github.com/strapi/design-system/commit/649d0f57cbcc595a84a23e762e47c281a661a906) Thanks [@christiancp100](https://github.com/christiancp100)! - chore: disallow use of as and instead use tag prop instead

### Minor Changes

- [#1697](https://github.com/strapi/design-system/pull/1697) [`6f59131`](https://github.com/strapi/design-system/commit/6f59131b54035299a27d6e068cce1df0d566f58c) Thanks [@joshuaellis](https://github.com/joshuaellis)! - feat: typography now extends Box

### Patch Changes

- [#1709](https://github.com/strapi/design-system/pull/1709) [`2f198e9`](https://github.com/strapi/design-system/commit/2f198e9007b6dc166398441f33f9b05e975f0e0e) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix(design-system): codemirror packages that aren't in package.json are declared as external

- [#1699](https://github.com/strapi/design-system/pull/1699) [`9fdfdde`](https://github.com/strapi/design-system/commit/9fdfdde1fac070ca4c5db200a2aa4643e1782ae8) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix: main nav icon size was set to 1rem it should be 1.6rem

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.3

## 2.0.0-beta.2

### Patch Changes

- [`f785c2c`](https://github.com/strapi/design-system/commit/f785c2ca80b05c5df405aac1ebd767b2c59d4c53) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix: set dev dependencies correctly to avoid styled-components being bundled

- Updated dependencies [[`f785c2c`](https://github.com/strapi/design-system/commit/f785c2ca80b05c5df405aac1ebd767b2c59d4c53)]:
  - @strapi/ui-primitives@2.0.0-beta.2

## 2.0.0-beta.1

### Major Changes

- [#1696](https://github.com/strapi/design-system/pull/1696) [`1622c2b`](https://github.com/strapi/design-system/commit/1622c2be3fd2379cbbc15e6a408ccb6bedc6ea61) Thanks [@joshuaellis](https://github.com/joshuaellis)! - chore!: remove the Icon component

  Users should instead apply `fill` and `stroke` directly to the icon component as theme colors are now possible.

### Minor Changes

- [#1693](https://github.com/strapi/design-system/pull/1693) [`732330a`](https://github.com/strapi/design-system/commit/732330af34a9e60f21fd2565b01650f915e87ab8) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - feat: add logic spacing properties

### Patch Changes

- [`cb0147b`](https://github.com/strapi/design-system/commit/cb0147bc319d8bff9f5b76fdc046856d2c91c5f1) Thanks [@joshuaellis](https://github.com/joshuaellis)! - fix: use px for media queries as font-size won't affect media queries

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- [#1685](https://github.com/strapi/design-system/pull/1685) [`833b58f`](https://github.com/strapi/design-system/commit/833b58fc8cd29ab279890e6eb50dea686ddf8289) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!(design-system): remove deprecated components. Most components have a V2 counterpart and those that do not e.g. Select have been split into separate components to handle Single & MultiSelect. Stack was just an alias of Flex so that should be used instead.

- [#1685](https://github.com/strapi/design-system/pull/1685) [`9e68153`](https://github.com/strapi/design-system/commit/9e6815369f0b467ae37cf807ce19781319134cfe) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - chore!: remove direct imports. Users should import everything from the root of the project instead.

- [#1685](https://github.com/strapi/design-system/pull/1685) [`00e131b`](https://github.com/strapi/design-system/commit/00e131b09eb0dbe760ac4fa45bda432f25856b8a) Thanks [@madhurisandbhor](https://github.com/madhurisandbhor)! - refactor!(design-system): set base font-size to 62.5% to be 10px, users should stop dividing their px values by 16 and instead divide by 10. This will make it easier to convert px to rem.

### Patch Changes

- Updated dependencies []:
  - @strapi/ui-primitives@2.0.0-beta.0
  - @strapi/icons@2.0.0-beta.0

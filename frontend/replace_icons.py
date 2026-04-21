import re

with open("/home/kyle/Academics/cmsc128/CMSC-128/frontend/src/pages/user/Report.tsx", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if i + 1 in [33, 35]:  # ArrowRightIcon
        lines[i] = line.replace('alt=""', 'alt="" src={ArrowRightIcon}')
    elif i + 1 == 39:  # SearchIcon
        lines[i] = line.replace('alt=""', 'alt="" src={SearchIcon}')
    elif i + 1 == 55:  # LocationIcon
        lines[i] = line.replace('alt=""', 'alt="" src={LocationIcon}')
    elif i + 1 in [61, 70]:  # UserIcon
        lines[i] = line.replace('alt=""', 'alt="" src={UserIcon}')
    elif i + 1 in [126, 131, 138, 143]:  # FaqArrowIcon
        lines[i] = line.replace('alt=""', 'alt="" src={FaqArrowIcon}')

with open("/home/kyle/Academics/cmsc128/CMSC-128/frontend/src/pages/user/Report.tsx", "w") as f:
    f.writelines(lines)

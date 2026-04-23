import re

with open("/home/kyle/Academics/cmsc128/CMSC-128/frontend/src/pages/user/Report.tsx", "r") as f:
    lines = f.readlines()

# Add imports if not present
if "import DormImage" not in "".join(lines):
    lines.insert(7, "import DormImage from '../../assets/react.svg';\n")
    lines.insert(8, "import BackgroundImage from '../../assets/Vector.svg';\n")

for i, line in enumerate(lines):
    if 'className="w-[1440px] h-[1192px]' in line:
        lines[i] = line.replace('alt=""', 'alt="" src={BackgroundImage}')
    elif 'className="h-[195px] w-[305px]' in line:
        lines[i] = line.replace('alt=""', 'alt="" src={DormImage}')

with open("/home/kyle/Academics/cmsc128/CMSC-128/frontend/src/pages/user/Report.tsx", "w") as f:
    f.writelines(lines)

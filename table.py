import pandas as pd
import matplotlib.pyplot as plt

# Step 1: Read data from Excel
excel_file = "C:/Users/aadig/Downloads/pose_counts.xlsx" # Replace 'data.xlsx' with your Excel file path
df = pd.read_excel(excel_file)

# Step 2: Prepare data
x = df['H']  # Assuming 'X' is the column containing x-axis values
y = df['Timestamp']  # Assuming 'Y' is the column containing y-axis values

# Step 3: Create graph
plt.plot(x, y)  # Plotting a line graph
plt.xlabel('H')  # Set x-axis label
plt.ylabel('Timesatmp')  # Set y-axis label
plt.title('BADDI COACH!!!')  # Set title of the graph
plt.grid(True)  # Add grid
plt.show()  # Show the graph

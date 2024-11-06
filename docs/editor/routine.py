import matplotlib.pyplot as plt

# Sample weekly data
weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
clicks = [50, 120, 180, 220]
engagement_rate = [2.5, 3.0, 4.0, 5.0]  # in %
sales = [5, 10, 18, 25]
conversion_rate = [10, 8.3, 10, 11.4]  # in %

# Plotting the data
plt.figure(figsize=(10, 6))

# Line plot for each metric
plt.plot(weeks, clicks, label='Clicks', marker='o')
plt.plot(weeks, engagement_rate, label='Engagement Rate (%)', marker='o')
plt.plot(weeks, sales, label='Sales', marker='o')
plt.plot(weeks, conversion_rate, label='Conversion Rate (%)', marker='o')

# Graph labels and title
plt.xlabel('Weeks')
plt.ylabel('Metrics')
plt.title('Weekly Affiliate Marketing Metrics')
plt.legend()
plt.grid(True)

# Show plot
plt.show()

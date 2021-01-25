import numpy as np

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder

from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam

class NeuralNetworkClassification(object):

    def __init__(self, dataset, params):
        self.dataset = dataset.sample(frac=1)
        self.features = params["inputs"].split(",")
        self.labels = params["classes"]

        self.model = self.build_model()
        self.optimizer = optimizer = Adam(lr=0.001)
    
    def preprocessing(self):
        x = self.dataset[self.features].to_numpy()
        y_ = self.dataset[self.labels].to_numpy().reshape(-1, 1)
        # One Hot encode the class labels
        encoder = OneHotEncoder(sparse=False)
        y = encoder.fit_transform(y_)        

        # Split the data for training and testing
        train_x, test_x, train_y, test_y = train_test_split(x, y, test_size=0.20)
        return train_x, test_x, train_y, test_y

    def build_model(self):
        input_shape = (len(self.features), )
        output_shape = self.dataset[self.labels].nunique()
        model = Sequential()

        model.add(Dense(10, input_shape=input_shape, activation='relu', name='fc1'))
        model.add(Dense(10, activation='relu', name='fc2'))
        model.add(Dense(output_shape, activation='softmax', name='output'))
        return model

    def train(self, epoch=200, batch_size=5):
        self.model.compile(self.optimizer, loss='categorical_crossentropy', metrics=['accuracy'])
        train_x, test_x, train_y, test_y = self.preprocessing()
        hist = self.model.fit(train_x, train_y, batch_size=batch_size, epochs=epoch, verbose=0, validation_split=0.2)
        results = self.model.evaluate(test_x, test_y)
        res = hist.history
        res["results"] = results
        return res
    
    def save(self):
        self.model.save("./model")

def exec(dataset, params):
  nn = NeuralNetworkClassification(dataset, params)
  res = nn.train()
  return res
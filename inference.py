import keras
import numpy as np
import tensorflow as tf
from model.CycleGAN import CycleGan, get_resnet_generator, get_discriminator
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


def pretrained_model_predict(path_pretrained_weight, path_image,
                             path_predicted_image='./images/predicted_img.png'):
    # Get the generators
    gen_G = get_resnet_generator(name="generator_G")
    gen_F = get_resnet_generator(name="generator_F")

    # Get the discriminators
    disc_X = get_discriminator(name="discriminator_X")
    disc_Y = get_discriminator(name="discriminator_Y")

    # Create cycle gan model
    cycle_gan_model = CycleGan(
        generator_G=gen_G, generator_F=gen_F, discriminator_X=disc_X, discriminator_Y=disc_Y, lambda_cycle=15
    )

    # Load the checkpoints
    cycle_gan_model.load_weights(path_pretrained_weight).expect_partial()
    print("Weights loaded successfully")

    # inference
    image = tf.keras.preprocessing.image.load_img(path_image)
    input_arr = keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to a batch.
    prediction = cycle_gan_model.gen_G(input_arr, training=False)[0].numpy()
    prediction = (prediction * 127.5 + 127.5).astype(np.uint8)
    img = (input_arr[0] * 127.5 + 127.5).astype(np.uint8)

    prediction = keras.preprocessing.image.array_to_img(prediction)
    prediction.save(path_predicted_image)

    # Done
    print("Inference done!")


if __name__ == "__main__":
    path_pretrained_weight = "pretrained_weights/cyclegan_ukiyoe_checkpoints.025"
    try:
        pretrained_model_predict(
            path_pretrained_weight=path_pretrained_weight,
            path_image='./images/wallpapersden.com_128x128.jpg',
            path_predicted_image='./images/predicted_img.png')
    except Exception as e:
        print(e)

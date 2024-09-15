import createHttpError from 'http-errors';
import { pumpingWithPatch, userModelsFindById } from '../services/user.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getOneUserController = async (req, res, next) => {
  const { userId } = req.params;
  //   console.log(req.user._id.toString());

  const user = await userModelsFindById(userId);
  //   console.log(user);

  if (
    !user
    // || user.userId.toString() !== req.user._id.toString()
  ) {
    return next(
      createHttpError(404, 'User not found or you do not have access to it'),
    );
  }

  // console.log(user);

  res.status(200).send({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;
  const photo = req.file;
  // console.log(photo);

  let photoUrl;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    }
    //   else {
    //     photoUrl = await saveFileToUploadDir(photo);
    //   }
  }
  // console.log(photoUrl);

  const updatedUser = await pumpingWithPatch(
    userId,
    req.user._id,
    req.body,
    photoUrl,
  );

  console.log(updatedUser);

  // if (
  //   !updatedUser.value ||
  //   updatedUser.value.userId.toString() !== req.user._id.toString()
  // ) {
  //   return next(
  //     createHttpError(404, 'Contact not found or you do not have access to it'),
  //   );
  // }

  if (!updatedUser) {
    return next(
      createHttpError(404, 'User not found or you do not have access to it'),
    );
  }
  res.send({
    status: 200,
    message: 'Successfully patched a contact!',
    // data: updatedUser.value,
    data: updatedUser,
  });
};
